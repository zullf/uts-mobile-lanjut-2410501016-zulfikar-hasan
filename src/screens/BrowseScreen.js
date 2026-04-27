import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, Text,} from "react-native";
import api from "../services/api";
import MealCard from "../components/MealCard";

export default function BrowseScreen({ route, navigation }) {
  const { category } = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMeals = async () => {
    try {
      const res = await api.get(`filter.php?c=${category}`);
      setData(res.data.meals);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <FlatList
      data={data} keyExtractor={(item) => item.idMeal} renderItem={({ item }) => (
        <MealCard
          item={item} onPress={() => navigation.navigate("Detail", {id: item.idMeal,})
          }
        />
      )}
    />
  );
}