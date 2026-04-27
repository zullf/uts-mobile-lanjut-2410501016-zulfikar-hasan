import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity, Image, StyleSheet, } from "react-native";
import api from "../services/api";
import MealCard from "../components/MealCard";

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setError(false);
      const response = await api.get("categories.php");
      setData(response.data.categories);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Gagal memuat data</Text>
      </View>
    );
  }

  return (
  <View style={{ flex: 1 }}>
    <Text style={styles.header}>ResepKita by Zulfikar</Text>
    <FlatList
      data={data}
      keyExtractor={(item) => item.idCategory}
      renderItem={({ item }) => (
        <MealCard
          item={item}
          onPress={() =>
            navigation.navigate("Browse", {
              category: item.strCategory,
            })
          }
        />
      )}
    />
  </View>
  );
}

const styles = StyleSheet.create({
  header: { fontSize: 20, fontWeight: "bold", marginTop: 50, marginHorizontal: 15,},
  card: { margin: 10, padding: 10, backgroundColor: "#fff", borderRadius: 10, elevation: 3, },
  image: { width: "100%", height: 150, borderRadius: 10,},
  title: { marginTop: 10, fontWeight: "bold", fontSize: 16, },
  center: { flex: 1, justifyContent: "center", alignItems: "center", },
});
