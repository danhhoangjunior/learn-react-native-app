import { View, Text, Image, TouchableOpacity } from "react-native";
import images, { logo } from "@/assets";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

const DrawerHeader = () => {
  const { user } = useUser();
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  const gotoSignIn = () => {
    router.push("/sign-in");
  };

  return (
    <View className="flex-row flex-1 w-full bg-[#00221d] items-center justify-between px-4 py-[14px]">
      <View className="h-[52px] justify-center items-center flex-1">
        <View className="w-[574px] h-[52px] relative flex-col justify-start items-start flex overflow-hidden">
          <View className="w-[574px] h-[52px] rounded-2xl border border-[#f4f5f6] justify-center px-[19px]">
            <Text className="text-[#f4f5f6] text-sm font-normal leading-snug">
              Search
            </Text>
          </View>
        </View>
      </View> 

      {isSignedIn ? (
        <TouchableOpacity className="flex-row items-center justify-between gap-2">
          <Image
            className="w-9 h-9 rounded-xl border-2 border-white"
            source={{ uri: "https://via.placeholder.com/36x36" }}
          />
          <Text className="text-white text-sm font-normal max-w-[100px]" numberOfLines={1}>
            {user?.fullName}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => gotoSignIn()}
          className="w-[140px] h-[52px] px-[19px] py-[13px] rounded-2xl border border-white justify-center items-center inline-flex"
        >
          <Text className="w-[102px] h-[26px] text-center text-white text-[15px] font-bold leading-normal">
            Sign In
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default DrawerHeader;
