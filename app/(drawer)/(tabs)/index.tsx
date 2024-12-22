import {useEffect, useRef, useState} from "react";
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
import {useRouter} from "expo-router";
import {useAuth, useUser} from "@clerk/clerk-expo";
import {
  getDoc,
  setDoc,
  updateDoc,
  where,
  doc,
  QueryDocumentSnapshot,
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs
} from "firebase/firestore";
import {db} from "@/configs/firebaseConfig";

const ITEMS_PER_PAGE = 10;

export default function HomeScreen() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const router = useRouter();
  const [apps, setApps] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastDocument, setLastDocument] =
      useState<QueryDocumentSnapshot | null>(null);
  const [page, setPage] = useState(0);
  const { getToken, userId } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    api.get(
        "/categories/ui-kits?sort=recent&page=1",
      )
      .then((response) => {
        setProducts(response.data.data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const getData = async () => {
    let q = query(
        collection(db, "mobile_app"),
        limit(ITEMS_PER_PAGE),
        where("publish", "==", true),
        orderBy("total_favorite", "desc")
    );
    if (lastDocument) {
      q = query(
          collection(db, "mobile_app"),
          where("publish", "==", true),
          orderBy("total_favorite", "desc"),
          startAfter(lastDocument),
          limit(ITEMS_PER_PAGE)
      );
    }

    try {
      setIsLoading(true);
      const querySnapshot = await getDocs(q);
      const appsData: any[] = [];
      querySnapshot.forEach((doc) => {
        appsData.push({ ...doc.data(), id: doc.id } as any);
      });

      if (appsData.length > 0) {
        setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setApps((prevApps) => [...prevApps, ...appsData]);
      }
    } catch (error) {
      console.error("Error getting documents: ", error);
    } finally {
      setIsLoading(false); // End loading
    }
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
