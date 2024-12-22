import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import ExpoStripeProvider from "@/components/stripe-provider";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@/cache";
import { Toaster } from "sonner-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DrawerHeader from "@/components/DrawerHeader.web";
import { Provider } from "react-redux";

import "@/global.css";
import store from "@/store/store";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  if (!publishableKey) {
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Provider store={store}>
          <ExpoStripeProvider>
            <ClerkProvider
              tokenCache={tokenCache}
              publishableKey={publishableKey}
            >
              <ClerkLoaded>
                <Stack>
                  <Stack.Screen
                    name="(drawer)"
                    options={{
                      title: "",
                      header: () => <DrawerHeader />,
                    }}
                  />
                  <Stack.Screen name="+not-found" />
                </Stack>
              </ClerkLoaded>
            </ClerkProvider>
          </ExpoStripeProvider>
          <StatusBar style="auto" />
          <Toaster />
        </Provider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
