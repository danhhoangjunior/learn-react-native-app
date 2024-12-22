import { RefreshControl, ScrollView, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import LessonItem from "@/components/learn/LearnItem";
import Header from "@/components/ui/header";
import { useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "@firebase/firestore";
import { db } from "@/configs/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setLoading, setTopics } from "@/store/slices/topicsSlice";

export default function LearnScreen() {
  const dispatch = useDispatch();
  const { topics, isLoading, chapters } = useSelector(
    (state: RootState) => state.topics
  );
  const { user } = useUser();
  const lastLearnedTopicId = user?.unsafeMetadata?.lastLearnedTopicId;
  const [progress, setProgress] = useState(0);
  const insets = useSafeAreaInsets();

  const fetchLessons = async () => {
    dispatch(setLoading(true));
    const lessonsCol = collection(db, "topics_v1");
    const lessonsQuery = query(lessonsCol, orderBy("created_at"));
    const lessonSnapshot = await getDocs(lessonsQuery);
    const lessonList = lessonSnapshot.docs.map((doc) => doc.data());

    dispatch(setTopics(lessonList));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 250);
  };

  useEffect(() => {
    if (topics.length > 0 && lastLearnedTopicId) {
      const position = topics.findIndex(
        (topic) => topic.id === lastLearnedTopicId
      );
      const percentage = (position / topics.length) * 100;
      setProgress(Math.round(percentage));
    }
  }, [lastLearnedTopicId, topics]);

  useEffect(() => {
    fetchLessons();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView style={{ paddingBottom: -insets.bottom }}>
        <Header
          isBack={false}
          title="Learn"
          rightComponent={
            <View style={{ width: 56, paddingLeft: 14 }}>
              {/* <ProgressRound
                progress={progress}
                size={28}
                strokeWidth={2}
                strokeColor="#00C566"
                fillColor="#F2F2F7"
              /> */}
            </View>
          }
        ></Header>
        <ScrollView
          style={{ paddingHorizontal: 16, paddingTop: 16 }}
          contentContainerStyle={{ paddingBottom: 124 }}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={fetchLessons} />
          }
        >
          {chapters.length > 0 &&
            chapters.map((item, index) => (
              <LessonItem
                key={item.id.toString()}
                index={index}
                lastLearnedTopicId={lastLearnedTopicId}
                data={item}
              />
            ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
