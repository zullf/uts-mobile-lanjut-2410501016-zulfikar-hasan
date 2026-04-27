import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, } from "react-native";
import api from "../services/api";
import MealCard from "../components/MealCard";

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Input tidak boleh kosong");
      return;
    }
    if (query.length < 3) {
      setError("Minimal 3 karakter");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await api.get(`search.php?s=${query}`);
      setData(res.data.meals || []);
    } catch (err) {
      setError("Gagal memuat data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Cari resep..."
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Cari</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator style={{ marginTop: 10 }} />}

      <FlatList
        data={data}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <MealCard
            item={item}
            onPress={() => navigation.navigate("Detail", { id: item.idMeal, })
            }
          />
        )}
          ListEmptyComponent={
          !loading && data.length === 0 ? (
            <Text style={styles.empty}>Tidak ada hasil</Text>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15,},
  input: { marginTop: 30, borderWidth: 1, borderColor: "#ddd", borderRadius: 10, padding: 10, marginBottom: 8, backgroundColor: "#fff",},
  error: { color: "red", marginBottom: 5 },
  button: { backgroundColor: "#ff6b6b", padding: 10, borderRadius: 10, alignItems: "center",  marginBottom: 10,},
  buttonText: { color: "#fff", fontWeight: "bold", },
  empty: { textAlign: "center", marginTop: 20, color: "#888", },
});