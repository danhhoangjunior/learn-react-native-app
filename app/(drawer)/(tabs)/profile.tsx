import React from "react";
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    Modal,
    Pressable,
    Dimensions,
} from "react-native";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NotLoggedInView from "@/components/profile/NotLoggedInView";

const width = Dimensions.get("window").width;

const ProfileScreen = () => {

    const { user } = useUser();

    console.log(user);

    if (!user) {
        return <NotLoggedInView />;
    }

    return (
        <ScrollView style={styles.scrollView}>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: { flex: 1 },
    container: { flex: 1, backgroundColor: "white", alignItems: "center" },
    avatar: { marginTop: 72 },
    userName: {
        fontSize: 20,
        fontWeight: "700",
        lineHeight: 28,
        letterSpacing: 0.5,
        color: "#1C1C1E",
        marginVertical: 12,
    },
    emailContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "rgba(209, 209, 214, 1.0)",
    },
    mailIcon: { width: 24, height: 24, marginRight: 8 },
    emailText: {
        fontSize: 18,
        fontWeight: "500",
        lineHeight: 26,
        letterSpacing: 0.5,
        color: "#AEAEB2",
    },
    sectionsContainer: { width: "100%", paddingHorizontal: 16 },
    bottomSpacer: { height: 32 },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 24,
        borderRadius: 12,
        width: width - 48,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 24,
        lineHeight: 32,
        fontWeight: "600",
        color: "#101010",
        flex: 1,
        textAlign: "center",
    },
    modalTitleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    modalClose: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: "#fff",
        borderStyle: "solid",
        borderColor: "#ededed",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalText: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: "500",
        color: "#878787",
        marginBottom: 24,
        marginTop: 24,
    },
    modalButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    modalButton: {
        height: 48,
        flex: 1,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgba(214, 214, 214, 1.0)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalButtonText: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: "600",
        color: "#101010",
    },
    icon: {
        width: 20,
        height: 20,
    },
});

export default ProfileScreen;
