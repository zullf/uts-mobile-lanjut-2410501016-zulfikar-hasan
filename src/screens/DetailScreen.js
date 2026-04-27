import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, } from "react-native";
import api from "../services/api";
import { Ionicons } from "@expo/vector-icons";
import { useFavorites } from "../context/FavoritesContext";

export default function DetailScreen({ route }) {
  const { id } = route.params;
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
      const res = await api.get(`lookup.php?i=${id}`);
      const data = res.data.meals?.[0];
      if (!data) throw new Error();
      setMeal(data);
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
      <Text style={styles.subtitle}>Kategori</Text>
      <Text>{meal.strCategory}</Text>
      <Text style={styles.subtitle}>Makanan Asal</Text>
      <Text>{meal.strArea}</Text>
      <Text style={styles.subtitle}>Instruksi</Text>
      <Text style={styles.text}>{meal.strInstructions}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, },
  btn: {
    width: "60%",
    flexDirection: "row",
    backgroundColor: "#ff6b6b",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  btnText: { color: "#fff", marginLeft: 5, fontWeight: "bold",},
  image: { width: "100%", height: 220, borderRadius: 12,},
  title: { fontSize: 22, fontWeight: "bold", marginVertical: 10,},
  subtitle: { marginTop: 12, fontWeight: "bold", fontSize: 14, },
  text: { textAlign: "justify", lineHeight: 20, },
  center: { flex: 1, justifyContent: "center", alignItems: "center",},
});