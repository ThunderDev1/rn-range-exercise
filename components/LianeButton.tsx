import React from "react";
import { StyleSheet, Text, Pressable } from "react-native";

interface LianeButtonProps {
  onPress: () => void;
  title: string;
  disabled: boolean;
}

const LianeButton = (props: LianeButtonProps) => (
  <Pressable
    onPress={props.onPress}
    style={[
      styles.appButtonContainer,
      props.disabled && styles.appButtonDisabled
    ]}
    disabled={props.disabled}
  >
    <Text style={[
      styles.appButtonText,
      props.disabled && styles.appButtonTextDisabled
    ]}>{props.title}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#1d2070",
    borderRadius: 10,
    borderColor: "#ff8484",
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 16
  },
  appButtonText: {
    fontSize: 18,
    color: "#ff8484",
    alignSelf: "center",
  },
  appButtonTextDisabled: {
    color: "#eeeeee",
  },
  appButtonDisabled: {
    backgroundColor: "#9497e7",
    borderColor: "#eeeeee",
  }
});

export default LianeButton;