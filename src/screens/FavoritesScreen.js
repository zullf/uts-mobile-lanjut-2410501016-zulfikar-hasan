import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFavorites } from "../context/FavoritesContext";
import MealCard from "../components/MealCard";

export default function FavoritesScreen({ navigation }) {
  const { state, dispatch } = useFavorites();

  const handleRemoveFavorite = (id) => {
    dispatch({
      type: "REMOVE_FAVORITE",
      payload: id,
    });
  };

  if (state.favorites.length === 0) {
    return (
      <View style={styles.center}>
        <Text>Belum ada favorit</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={state.favorites}
      keyExtractor={(item) => item.idMeal}
      renderItem={({ item }) => (
        <View>
          <MealCard
            item={item} onPress={() => navigation.navigate("Detail", { category: item.strCategory, })}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => handleRemoveFavorite(item.idMeal)}
          >
            <Ionicons name="trash" size={16} color="#fff" />
            <Text style={styles.btnText}> Hapus</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: "26%",
    flexDirection: "row",
    backgroundColor: "#0343f3",
    marginHorizontal: 15,
    marginTop: -8,
    marginBottom: 10,
    padding: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    marginLeft: 5,
    fontWeight: "bold",
  },
});