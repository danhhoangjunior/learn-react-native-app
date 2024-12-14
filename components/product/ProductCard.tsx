import { ProductType } from "@/modal/product";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const ProductCard = ({ item }: { item: ProductType }) => {
  const router = useRouter();
  if (item.empty) {
    return <View style={[styles.item, styles.itemTransparent]}></View>;
  }
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => router.push(`/products/${item._id}`)}
    >
      <Image
        source={{
          uri: item.card_image,
        }}
        className="w-full h-[111px] rounded-xl"
      />
      <Text className="text-[#8e8e93] text-[10px] font-normal mt-2 leading-[14px] tracking-tight">
        {item.name}
      </Text>
      <Text className="text-[#1c1c1e] text-[16px] font-bold mt-1 leading-none tracking-tight">
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    margin: 0,
    borderRadius: 24,
    height: 218,
    width: 290,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e8eaec",
    padding: 8,
  },
  itemTransparent: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  itemText: {
    color: "#fff",
  },
});

export default ProductCard;
