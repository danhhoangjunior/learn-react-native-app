import {StyleSheet, View, Text} from "react-native";


import Slider from "@react-native-community/slider";
import CheckoutScreen from "@/components/checkout-form";
import React from "react";

export default function TabTwoScreen() {
  const [value, setValue] = React.useState(0);

  return (
    <View>
      <Text>Donate amount $ {Math.floor(value)}</Text>

      <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          onValueChange={setValue}
          value={value}
      />

      <CheckoutScreen amount={value}></CheckoutScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
