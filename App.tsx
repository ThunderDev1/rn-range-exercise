import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ActivityIndicator, Keyboard, StyleSheet, Text, TextInput, ToastAndroid, TouchableWithoutFeedback, View } from 'react-native';
import LianeButton from './components/LianeButton';
import { generateRandomLabels, getMatchingLabels } from './labelManager';
import { Label } from './types';

export default function App() {
  const [labels, setLabels] = useState<Array<Label>>([]);
  const [number, onChangeNumber] = React.useState(null);
  const [labelCount, onChangeLabelCount] = React.useState(null);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [isLookingUp, setIsLookingUp] = React.useState(false);
  
  const handleGenerate = () => {
    Keyboard.dismiss();
    setIsGenerating(true);
    setTimeout(() => {
      const randomLabels = generateRandomLabels(labelCount);
      setLabels(randomLabels);
      setIsGenerating(false);
      ToastAndroid.show(`${randomLabels.length} labels generated`, ToastAndroid.SHORT);
    }, 1);
  }

  const handleLookup = () => {
    setIsLookingUp(true);
    setTimeout(() => {
      var startTime = performance.now();
      const matchingLabels = getMatchingLabels(number, labels);
      var endTime = performance.now();
      var timeDiff = endTime - startTime; //in ms 
      timeDiff /= 1000; 
      ToastAndroid.show(
        `${number} is in the range of ${matchingLabels.length} labels (took ${timeDiff.toFixed(3)} seconds)`,
        ToastAndroid.LONG
        );
      setIsLookingUp(false);
    }, 1);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Range series</Text>
        <Text style={styles.text}>
          Please enter the amount of labels you desire, then click on "Generate".
          You can then find out how many labels have a range that matches a
          specific number, by entering a number between 0 and 100 and clicking on "Lookup".
        </Text>
        <View
          style={{
            flexDirection: "row",
            height: 100,
            padding: 20,
            alignItems: 'center'
          }}
        >
          <Text style={styles.inputLabel}>Amount</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeLabelCount}
            value={labelCount}
            keyboardType="numeric"
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: 'center'
          }}
        >
          <LianeButton
            title="Generate"
            onPress={handleGenerate}
            disabled={!labelCount || isGenerating}
            />
          {isGenerating && 
            <View style={{ marginLeft: 15 }}>
              <ActivityIndicator size="large" color="#ff8484"/>
            </View>}
        </View>
        <View
          style={{
            flexDirection: "row",
            height: 100,
            padding: 20,
            alignItems: 'center'
          }}
        >
          <Text style={styles.inputLabel}>Number</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            keyboardType="numeric"
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: 'center'
          }}
        >
          <LianeButton
            title="Lookup"
            onPress={handleLookup}
            disabled={!number || labels.length <= 0 || isLookingUp}
            />
          {isLookingUp &&
          <View style={{ marginLeft: 15 }}>
            <ActivityIndicator size="large" color="#ff8484"/>
          </View>}
        </View>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23278a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    borderColor: "#ff8484",
    padding: 10,
    color: "#ff8484",
  },
  inputLabel: {
    color: "#fff",
    fontSize: 19,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 12
  },
  text: {
    color: "#fff",
    fontSize: 19,
  },
});
