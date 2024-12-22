import { View, Text, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import {
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRouter, useSegments } from "expo-router";
import { DrawerActions } from "@react-navigation/native";

const MenuData = [  
  {
    title: "Home",
    icon: "home", 
    route: "(tabs)",
  },
  {
    title: "Learn",
    icon: "book",
    route: "learn",
  },
  {
    title: "Profile",
    icon: "user",
    route: "profile",
  },
  {
    title: "Settings",
    icon: "settings",
    route: "explore",
  }]

export default function CustomDrawerContent(props: any) {
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation();
  
  const router = useRouter();
  const segment = useSegments();
  const currentRoute = segment[segment.length - 1];
 
  const closeDrawer = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} scrollEnabled={false}>
        <View style={{ padding: 20 }}>
          <Image
            style={{ height: 35 }}
            resizeMode="contain"
            source={require("@/assets/images/icon.png")}
          />
        </View>
       {MenuData.map((item, index) => ( 
        <Pressable
          key={index}
          onPress={() => {
            router.push(item.route as any);
          }}
          className={`${currentRoute === item.route ? 'bg-[#34977d]' : 'bg-white'} h-[56px] flex justify-center rounded-lg px-4 mb-2`}
        >
          <Text className={`${currentRoute === item.route ? 'text-white font-semibold' : 'text-black font-normal'} text-[16px]`}>{item.title}</Text>
        </Pressable>
        ))}
      </DrawerContentScrollView>

      <Pressable
        onPress={closeDrawer}
        style={{ padding: 20, paddingBottom: bottom + 10 }}
      >
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
}
