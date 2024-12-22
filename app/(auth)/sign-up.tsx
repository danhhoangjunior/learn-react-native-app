import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import Input from "@/components/ui/input";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { useState } from "react";
import EyeIcon from "@/components/ui/eye-icon";
import * as SecureStore from "expo-secure-store";
import { toast } from "sonner-native";
import images from "@/assets";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = React.useState("pohkeu@dealdimer.life");
  const [password, setPassword] = React.useState("Muoi@923893");
  const [conformPassword, setConformPassword] = React.useState("Muoi@923893");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConformPassword, setShowConformPassword] = useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    setLoading(true);

    try {
      const signInAttempt = await signUp.create({ emailAddress, password });
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        setTimeout(async () => {
          toast.success("Sign up successful!");
          await SecureStore.setItemAsync(
            "accountLogin",
            JSON.stringify({ emailAddress, password })
          );
        }, 250);
      } else {
        console.log(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      const error = JSON.stringify(err);
      console.log(JSON.parse(error).errors[0].message);
      toast.error(JSON.parse(error).errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#FFF",
      }}
      behavior="padding"
      enabled
    >
      <ScrollView keyboardDismissMode="interactive">
        <SafeAreaView style={styles.container}>
          <View style={{ width: "100%" }}>
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                source={require("../../assets/images/back.png")}
                style={{ height: 24, width: 24 }}
              />
            </TouchableOpacity>
          </View>
          <Image source={images.icon} style={styles.avatar} />
          <Text style={styles.welcomeBack}>Hi There</Text>
          <Text style={styles.fillInfo}>
            Create an account with us and add your own event with the group
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
              rightComponent={
                <EyeIcon
                  isVisible={showPassword}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              secureTextEntry={!showPassword}
            />
            <Input
              label="Confirm Password"
              placeholder="Password"
              onChangeText={setConformPassword}
              value={conformPassword}
              rightComponent={
                <EyeIcon
                  isVisible={showConformPassword}
                  onPress={() => setShowConformPassword(!showConformPassword)}
                />
              }
              secureTextEntry={!showConformPassword}
            />
            <PrimaryButton
              loading={loading}
              title={"Sign In"}
              onPress={onSignUpPress}
              style={styles.signInButton}
            />
            <View style={styles.signUpPrompt}>
              <Text style={styles.noAccountText}>Don't have an account?</Text>
              <Link href="/sign-in">
                <Text style={styles.createOneText}>Sign In</Text>
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
    marginTop: 24,
  },
  signInButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  signUpPrompt: { alignItems: "center", marginTop: 24 },
  noAccountText: { color: "#1C1C1E", marginBottom: 8 },
  createOneText: { color: "#164AFF" },
});
