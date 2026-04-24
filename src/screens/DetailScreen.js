import React from 'react';
import { View, Text } from 'react-native';

export default function DetailScreen({ route }) {
  const { id } = route.params;

  return (
    <View>
      <Text>Detail Screen</Text>
      <Text>ID: {id}</Text>
    </View>
  );
}
