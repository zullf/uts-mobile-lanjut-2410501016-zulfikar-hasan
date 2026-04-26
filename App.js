import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigation/StackNavigator";
import { FavoritesProvider } from "./src/context/FavoritesContext";

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </FavoritesProvider>
  );
}
