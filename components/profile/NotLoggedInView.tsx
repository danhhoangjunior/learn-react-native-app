import {useRouter} from "expo-router";
import {View, Text, StyleSheet, Image} from "react-native";
import PrimaryButton from "@/components/ui/PrimaryButton";
import images from "@/assets";

const NotLoggedInView = () => {

    const router = useRouter();
    const defaultAvatar = images.avatar;

    const gotoSignIn = () => {
        router.push('/sign-in');
    };

    return (
        <View style={styles.notLoggedInContainer}>
            <Image source={defaultAvatar} style={styles.notLoggedInAvatar}/>
            <Text style={styles.notLoggedInText}>Sign in to an existing account</Text>
            <PrimaryButton
                style={styles.notLoggedInButton}
                onPress={gotoSignIn}
                title={"Sign In"}/>
        </View>
    );
};

const styles = StyleSheet.create({
    notLoggedInContainer: {
        flex: 1,
        backgroundColor: 'white',
        padding: 72,
        alignItems: 'center',
        justifyContent: 'center'
    },
    notLoggedInAvatar: {
        width: 120,
        height: 120,
        marginTop: 72
    },
    notLoggedInText: {
        marginTop: 16,
        fontSize: 14,
        fontWeight: "500",
        fontStyle: "normal",
        lineHeight: 22,
        letterSpacing: 0.5,
        color: "#171725"
    },
    notLoggedInButton: {
        width: '100%',
        marginTop: 16
    }
});

export default NotLoggedInView;
