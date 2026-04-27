import React from "react";
import { View, Text, Image, StyleSheet, } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require("../../assets/profile.png")}
          style={styles.image}
        />
        <Text style={styles.name}>Zulfikar Hasan</Text>
        <View style={styles.info}>
          <Text style={styles.label}>NIM</Text>
          <Text style={styles.value}>2410501016</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.label}>Kelas</Text>
          <Text style={styles.value}>B</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.label}>Tema</Text>
          <Text style={styles.value}>ResepKita - Katalog Resep Kuliner</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.label}>API</Text>
          <Text style={styles.value}>TheMealDB</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1,  backgroundColor: "#f5f5f5", justifyContent: "center", alignItems: "center",},
  card: { width: "85%", backgroundColor: "#fff", borderRadius: 15, padding: 20, alignItems: "center", elevation: 4,},
  image: { width: 100, height: 100, borderRadius: 50, marginBottom: 10,},
  name: { fontSize: 20, fontWeight: "bold",  marginBottom: 15,},
  info: { width: "100%", marginBottom: 8,},
  label: { fontSize: 12, color: "#888",},
  value: { fontSize: 14, fontWeight: "500",},
});