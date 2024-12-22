import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Image
} from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "@/components/ui/PrimaryButton";
import * as SecureStore from "expo-secure-store";
import images from "@/assets";
import SignInWithOAuth from "@/components/SignInWithOAuth";
import Input from "@/components/ui/input";
import { toast } from "sonner-native";
export default function SignInPage() {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("danh.ligo@gmai.com");
  const [password, setPassword] = useState("Muoi@923893");
  const [isRemember, setIsRemember] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAccountLogin = async () => {
      try {
        const value = await SecureStore.getItemAsync("accountLogin");
        if (value !== null) {
          const accountLogin = JSON.parse(value);
          setEmailAddress(accountLogin.emailAddress);
          setPassword(accountLogin.password);
          setIsRemember(true);
        }
      } catch (error) {
        console.error("Failed to load account login from secure store", error);
      }
    };

    checkAccountLogin();
  }, []);

  const onSignInPress = async () => {
    if (!isLoaded) return;
    setLoading(true);

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        setTimeout(async () => {
          if (isRemember) {
            await SecureStore.setItemAsync(
              "accountLogin",
              JSON.stringify({ emailAddress, password })
            );
          } else {
            await SecureStore.deleteItemAsync("accountLogin");
          }
        }, 250);
      } else {
        console.log(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (error) {
      console.log("error", error);
      console.log(JSON.stringify(error, null, 2));
      toast.error("Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 flex-col justify-center"
      behavior="padding"
      enabled
    >
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity onPress={() => router.replace("(home)")}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "700",
                  fontStyle: "normal",
                  lineHeight: 22,
                  letterSpacing: 0.5,
                  textAlign: "center",
                }}
              >
                Skip
              </Text>
            </TouchableOpacity>
          </View>
          <Image source={images.logo} style={styles.avatar} />
          <Text style={styles.welcomeBack}>Welcome Back</Text>
          <Text style={styles.fillInfo}>
            Please fill up your information to continue and enjoy the features
          </Text>
          <View style={styles.form}>
            <Input
              label="Email Address"
              placeholder="Type here"
              onChangeText={setEmailAddress}
              value={emailAddress}
            />
            <Input
              label="Password"
              placeholder="Password"
              onChangeText={setPassword}
              value={password}
              secureTextEntry={!showPassword}
              
            />
           
            <PrimaryButton
              loading={loading}
              title={"Sign In"}
              onPress={onSignInPress}
              style={styles.signInButton}
            />
            <SignInWithOAuth />
            <View style={styles.signUpPrompt}>
              <Text style={styles.noAccountText}>Don't have an account?</Text>
              <Link href="/sign-up">
                <Text style={styles.createOneText}>Create One</Text>
              </Link>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  avatar: { width: 120, height: 120 },
  welcomeBack: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    color: "#1C1C1E",
    marginVertical: 8,
  },
  fillInfo: {
    fontSize: 14,
    textAlign: "center",
    color: "#8E8E93",
    marginBottom: 16,
    width: 215,
  },
  form: { width: "100%" },
  signInButton: {
    height: 56,
    marginTop: 24,
  },
  signInButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  signUpPrompt: { alignItems: "center", marginTop: 24 },
  noAccountText: { color: "#1C1C1E", marginBottom: 8 },
  createOneText: { color: "#164AFF" },
});
