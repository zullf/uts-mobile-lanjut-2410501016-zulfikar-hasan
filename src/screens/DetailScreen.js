import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, } from "react-native";
import api from "../services/api";
import { Ionicons } from "@expo/vector-icons";
import { useFavorites } from "../context/FavoritesContext";

export default function DetailScreen({ route }) {
  const { category } = route.params;
  const { dispatch } = useFavorites();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleAddFavorite = () => {
    dispatch({
      type: "ADD_FAVORITE",
      payload: meal,
    });
  };

  const fetchDetail = async () => {
    try {
      setError(false);
      const listRes = await api.get(`filter.php?c=${category}`);
      const meals = listRes.data.meals;
      if (!meals || meals.length === 0) {
        throw new Error("No meals found");
      }

      const firstMeal = meals[0];
      const detailRes = await api.get(
        `lookup.php?i=${firstMeal.idMeal}`
      );

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
      <TouchableOpacity style={styles.btn} onPress={handleAddFavorite}>
        <Ionicons name="heart" size={18} color="#fff" />
        <Text style={styles.btnText}> Tambah Favorit</Text>
      </TouchableOpacity>
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{meal.strMeal}</Text>
      <Text style={styles.subtitle}>Category:</Text>
      <Text>{meal.strCategory}</Text>
      <Text style={styles.subtitle}>Asal:</Text>
      <Text>{meal.strArea}</Text>
      <Text style={styles.subtitle}>Instructions:</Text>
      <Text style={styles.text}>{meal.strInstructions}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  btn: {
    width: "60%",
    flexDirection: "row",
    backgroundColor: "#ff6b6b",
    padding: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  btnText: {
    color: "#fff",
    marginLeft: 5,
    fontWeight: "bold",
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
  text: {
    textAlign: "justify",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});