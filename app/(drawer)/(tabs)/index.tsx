import { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Platform,
  View,
  FlatList,
  Text,
} from "react-native";
import api from "@/lib/axios";
import ProductCard from "@/components/product/ProductCard";
import { ProductType } from "@/modal/product";

export default function HomeScreen() {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    api.get(
        "https://ui8.net/api/categories/ui-kits?sort=recent&page=1&search=Kit&tag=55c4f07ea73053a55af4c079&featured=false"
      )
      .then((response) => {
        setProducts(response.data.data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  return (
    <View>
      <FlatList
        numColumns={2}
        data={products}
        keyExtractor={(item) => item._id.toString()}
        columnWrapperStyle={{ gap: 16 }}
        renderItem={({ item }) => <ProductCard item={item} />}
      />
    </View>
  );
}
