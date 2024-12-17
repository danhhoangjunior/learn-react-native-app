import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import Slider from "@react-native-community/slider";

const ProductPage = () => {
  const [value, setValue] = useState(0);

  const handlePay = async () => {};

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

    </View>
  );
};

export default ProductPage;
