import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, Pressable, StyleSheet } from "react-native";

export default function CustomButton({ destination }) {
  const [isPressed, setIsPressed] = useState(false);
  const navigation = useNavigation();

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <Pressable
      onPress={() => {
        navigation.navigate(destination);
      }}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? "#DB6300" : "#FF8000" }, // Change background color on press
      ]}
    >
      {({ pressed }) => (
        <Text style={[styles.text, { color: pressed ? "#fff" : "#fff" }]}>
          {destination}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  text: {
    fontSize: 14,
    textAlign: "center",
  },
});
