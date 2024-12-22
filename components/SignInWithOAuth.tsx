import React from "react";
import * as WebBrowser from "expo-web-browser";
import {Text, TouchableOpacity, Image} from "react-native";
import {useOAuth} from "@clerk/clerk-expo";
import * as Linking from "expo-linking"

const SignInWithOAuth = () => {
  
    const {startOAuthFlow} = useOAuth({strategy: "oauth_google"});

    const onPress = React.useCallback(async () => {
        try {
            const {
                createdSessionId,
                setActive,
            } = await startOAuthFlow({redirectUrl: Linking.createURL("(home)", {scheme: "myapp"})});

            if (createdSessionId) {
                if (setActive) {
                    await setActive({session: createdSessionId});
            
                }
            } else {
                console.log("OAuth error createdSessionId", createdSessionId);
            }
        } catch (err) {
            console.log("OAuth error", err);
        }
    }, []);

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                height: 48,
                borderRadius: 8,
                backgroundColor: "#F6F6F6",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: 'row'
            }}>
            <Image style={{
                width: 24,
                height: 24,
                marginRight: 8
            }} source={require('./../assets/images/google.png')}></Image>
            <Text>Sign in with Google</Text>
        </TouchableOpacity>
    );
};
export default SignInWithOAuth;
