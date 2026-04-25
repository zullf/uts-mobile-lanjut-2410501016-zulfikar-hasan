import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from "react-native";
import api from "../services/api";

export default function DetailScreen({ route }) {
  const { id } = route.params;

  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

const fetchDetail = async () => {
  try {
    setError(false);
    const { category } = route.params;
    const listRes = await api.get(`filter.php?c=${category}`);
    const meals = listRes.data.meals;
    if (!meals || meals.length === 0) {
      throw new Error("No meals found");
    }
    const firstMeal = meals[0];
    const detailRes = await api.get(`lookup.php?i=${firstMeal.idMeal}`);
    const detail = detailRes.data.meals?.[0];
    if (!detail) {
      throw new Error("Detail not found");
    }
    setMeal(detail);
  } catch (err) {
    setError(true);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchDetail();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  if (error || !meal) {
    return (
      <View style={styles.center}>
        <Text>Gagal memuat data</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{meal.strMeal}</Text>

      <Text style={styles.subtitle}>Category:</Text>
      <Text>{meal.strCategory}</Text>

      <Text style={styles.subtitle}>Instructions:</Text>
      <Text>{meal.strInstructions}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  subtitle: {
    marginTop: 10,
    fontWeight: "bold",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
