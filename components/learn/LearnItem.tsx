import React, {useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import {ILearnModal} from "@/modal";
import {Image} from "expo-image";
import {Feather} from "@expo/vector-icons";
import {useRouter} from "expo-router";
import PrimaryButton from '@/components/ui/PrimaryButton';
import {useAuth, useUser} from "@clerk/clerk-expo";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import images from '@/assets';

function AccordionItem({
                           isExpanded,
                           children,
                           viewKey,
                           style,
                           duration = 300,
                       }) {
    const height = useSharedValue(0);

    const derivedHeight = useDerivedValue(() =>
        withTiming(height.value * Number(isExpanded.value), {
            duration,
        })
    );
    const bodyStyle = useAnimatedStyle(() => ({
        height: derivedHeight.value,
    }));

    return (
        <Animated.View
            key={`accordionItem_${viewKey}`}
            style={[styles.animatedView, bodyStyle, style]}>
            <View
                onLayout={(e) => {
                    height.value = e.nativeEvent.layout.height;
                }}
                style={styles.wrapper}>
                {children}
            </View>
        </Animated.View>
    );
}

type ParentProps = {
    open: any;
    lessons: any[];
    lastLearnedTopicId: string | undefined;
    lastLearnedTopicIndex: number;
}

function Parent({open, lessons, lastLearnedTopicId, lastLearnedTopicIndex}: ParentProps) {

    const router = useRouter()
    const {isSignedIn} = useAuth()
    const {topics} = useSelector((state: RootState) => state.topics);

    const gotoLesson = (lesson: any) => {
        if (isSignedIn) {
            router.push({
                pathname: 'learn/[lesson-id]',
                params: {
                    data: JSON.stringify(lesson),
                },
            })
        } else {
            router.push('sign-in')
        }
    }

    return (
        <View style={styles.parent}>
            <AccordionItem isExpanded={open} viewKey="Accordion">
                {lessons.map((topic, index) => {
                    if (lastLearnedTopicId === topic.id || (open.value && index === 0 && lastLearnedTopicId === undefined)) {
                        return (
                            <TouchableOpacity
                                onPress={() => gotoLesson(topic)} key={index} style={{
                                width: '100%',
                                borderWidth: 1,
                                borderRadius: 16,
                                borderColor: '#164AFF',
                                backgroundColor: '#F6F6F6',
                                padding: 16,
                            }}>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={{alignItems: 'center', justifyContent: 'center', marginRight: 8}}>
                                        <View style={{
                                            width: 36,
                                            height: 36,
                                            borderRadius: 36 / 2,
                                            backgroundColor: "#E9EBED",
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <Feather name={topic.icon} size={22} color="#636366"/>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={{
                                            fontSize: 14,
                                            fontWeight: "500",
                                            fontStyle: "normal",
                                            lineHeight: 22,
                                            letterSpacing: 0.5,
                                            color: "#636366"
                                        }}>{topic.title}</Text>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Feather name="clock" size={12} color="#636366"/>
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    fontWeight: "500",
                                                    fontStyle: "normal",
                                                    color: "#8E8E93",
                                                    marginLeft: 4
                                                }}>5 min</Text>
                                        </View>
                                    </View>
                                </View>
                                <PrimaryButton
                                    style={{height: 40, borderRadius: 12, marginTop: 16}} title='START'
                                    onPress={() => gotoLesson(topic)}/>
                            </TouchableOpacity>
                        )
                    } else {

                        return (
                            <TouchableOpacity
                                disabled={!topic.isLearned}
                                onPress={() => gotoLesson(topic)} key={index} style={styles.box}>
                                <View style={{alignItems: 'center', justifyContent: 'center', marginRight: 8}}>
                                    <View style={{height: 12, width: 1, backgroundColor: "rgba(209, 209, 214, 1.0)"}}/>
                                    <View style={{
                                        width: 22,
                                        height: 22,
                                        borderRadius: 22 / 2,
                                        backgroundColor: "#E9EBED",
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Feather name={topic.icon} size={16} color="#636366"/>
                                    </View>
                                    <View style={{height: 12, width: 1, backgroundColor: "rgba(209, 209, 214, 1.0)"}}/>
                                </View>
                                <Text style={{
                                    fontSize: 14,
                                    fontWeight: "500",
                                    fontStyle: "normal",
                                    lineHeight: 22,
                                    letterSpacing: 0.5,
                                    color: "#636366",
                                    marginRight: 8
                                }}>{topic.title}</Text>
                                {topic.isLearned && <Image style={{width: 15, height: 15}}
                                                           source={images.logo}/>}
                            </TouchableOpacity>
                        )
                    }
                })}
            </AccordionItem>
        </View>
    );
}

type LessonItemProps = {
    data: ILearnModal;
    index: number;
    lastLearnedTopicId: string | undefined;
}

export default function LessonItem({data, index, lastLearnedTopicId}: LessonItemProps) {

    const {topics} = useSelector((state: RootState) => state.topics);
    const [lessons, setLessons] = React.useState(data.topics);
    const [progress, setProgress] = React.useState(0);
    const [lastLearnedTopicIndex, setLastLearnedTopicIndex] = React.useState(0);

    useEffect(() => {
        if (lastLearnedTopicId) {
            const lastLearnedTopicIndex = topics.findIndex(topic => topic.id === lastLearnedTopicId);
            setLastLearnedTopicIndex(lastLearnedTopicIndex);

            const newLessons = data.topics.map((topic, index) => {
                const topicIndex = topics.findIndex(_topic => _topic.id === topic.id);
                const isLearned = topicIndex < lastLearnedTopicIndex;
                if (isLearned) {
                    setProgress(index + 1);
                }

                return {
                    ...topic,
                    isLearned: topicIndex < lastLearnedTopicIndex
                }
            });
            setLessons(newLessons);

            if (data.topics.find(topic => topic.id === lastLearnedTopicId)) {
                setTimeout(() => {
                    open.value = true;
                }, 600);
            }
        } else {
            // check first item open
            open.value = index === 0;
        }
    }, [lastLearnedTopicId]);

    const open = useSharedValue(false);
    const onPress = () => {
        open.value = !open.value;
    };

    const ProgressComponent: React.FC<{ progress: number; total: number }> = ({ progress, total }) => {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 4,
                width: 135,
            }}>
                <View style={{
                    flex: 1,
                    height: 4,
                    backgroundColor: '#F2F2F7',
                    borderRadius: 2,
                    marginRight: 8
                }}>
                    <View style={{
                        width: `${(progress / total) * 100}%`,
                        height: '100%',
                        backgroundColor: '#164AFF',
                        borderRadius: 2
                    }} />
                </View>
                <Text style={{
                    fontSize: 10,
                    fontWeight: "400",
                    fontStyle: "normal",
                    lineHeight: 14,
                    letterSpacing: 0.5,
                    color: "#8E8E93"
                }}>{`${progress}/${total}`}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={onPress} style={{flexDirection: 'row'}}>
                    <View>
                        <Image style={{
                            width: 32,
                            height: 32,
                            borderRadius: 100,
                            backgroundColor: "#E9EBED",
                            marginRight: 8
                        }} source={{uri: data.image}}/>
                    </View>
                    <View>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: "600",
                            fontStyle: "normal",
                            lineHeight: 16,
                            letterSpacing: 0.5,
                            color: "#1C1C1E"
                        }}>{data.title}</Text>
                        {progress > 0 ?
                            <ProgressComponent
                                progress={progress}
                                total={data.topics.length}
                            /> :
                            <Text style={{
                                fontSize: 12,
                                fontWeight: "400",
                                fontStyle: "normal",
                                lineHeight: 14,
                                letterSpacing: 0.5,
                                color: "#8E8E93",
                                marginTop: 4
                            }}>{`${data.topics.length} lesson`}</Text>}
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <Parent open={open} lessons={lessons}
                        lastLearnedTopicId={lastLearnedTopicId}
                        lastLearnedTopicIndex={lastLearnedTopicIndex}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "rgba(209, 209, 214, 1.0)",
        paddingHorizontal: 16,
        paddingTop: 16,
        marginBottom: 16
    },
    buttonContainer: {
        flex: 1,

    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8
    },
    parent: {
        flex: 1,
        width: '100%',
    },
    wrapper: {
        width: '100%',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
    },
    animatedView: {
        width: '100%',
        overflow: 'hidden',
    },
    box: {
        flex: 1,
        width: '100%',
        color: '#f8f9ff',
        flexDirection: 'row',
        marginLeft: 16,
        alignItems: 'center'
    },
});
