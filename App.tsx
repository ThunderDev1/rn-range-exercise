import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { generateRandomLabels, getMatchingLabels } from './labelManager';
import { Label } from './types';

export default function App() {
  const [labels, setLabels] = useState<Array<Label>>([]);
  const [number, onChangeNumber] = React.useState(null);
  return (
    <View style={styles.container}>
      <Button
        title="Generate labels"
        onPress={() => {
          const randomLabels = generateRandomLabels();
          setLabels(randomLabels);
          Alert.alert(`${randomLabels.length} labels generated`);
        }}
      />

      <View
        style={{
          flexDirection: "row",
          height: 100,
          padding: 20,
          alignItems: 'center'
        }}
      >
        <Text>Number to lookup</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          keyboardType="numeric"
        />
      </View>

      <Button
        title="Get matches"
        onPress={() => {
          const matchingLabels = getMatchingLabels(number, labels);
          const result = matchingLabels.map((label) => label.name).join(',');
          Alert.alert(`${number} is in the range of ${matchingLabels.length} labels (${result})`);
        }}
        disabled={!number || labels.length <= 0}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
