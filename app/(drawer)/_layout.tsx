import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { useWindowDimensions } from "react-native";
import CustomDrawerContent from "@/components/DrawerContent";

export default function Layout() {
  const { width } = useWindowDimensions();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={{
          drawerPosition: "left",
          drawerType: "permanent",
          swipeEnabled: width >= 768 ? false : true,
          drawerStyle: {
            display: width >= 768 ? "flex" : "none",
          },
        }}
      >
        <Drawer.Screen name="(tabs)" options={{ headerShown: false }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
