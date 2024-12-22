import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

interface HeaderProps {
    isBack?: boolean;
    title: string;
    bodyText?: string;
    rightComponent?: React.ReactNode;
}

const Header = ({ title, bodyText, isBack = true, rightComponent }: HeaderProps) => {
    const router = useRouter()

    const goBack = () => {
        router.back()
    }
    return (
        <View style={{ marginBottom: 16 }}>
            <View style={styles.headerContainer}>
                {isBack ?
                    <TouchableOpacity onPress={goBack} style={styles.iconContainer}>
                        <Image source={require('../../assets/images/back.png')} style={styles.icon} />
                    </TouchableOpacity> : <View style={styles.placeholder} />}
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
                {rightComponent ? rightComponent : <View style={styles.placeholder} />}
            </View>
            {bodyText && <Text style={styles.bodyText}>{bodyText}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        paddingVertical: 6,
        paddingHorizontal: 16,
    },
    icon: {
        width: 24,
        height: 24,
    },
    title: {
        flex: 1,
        fontSize: 20,
        fontWeight: "700",
        lineHeight: 28,
        letterSpacing: 0.5,
        textAlign: "center",
        color: "#1C1C1E",
        marginHorizontal: 24,
    },
    placeholder: {
        width: 56,
    },
    bodyText: {
        fontSize: 14,
        fontWeight: "500",
        lineHeight: 22,
        letterSpacing: 0.5,
        textAlign: "center",
        marginTop: 8,
        color: "#8E8E93",
        paddingHorizontal: 40
    },
});

export default Header;
