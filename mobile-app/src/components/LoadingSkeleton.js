import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

const LoadingSkeleton = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.image}></View>
      <View style={styles.text}></View>
      <View style={styles.text}></View>
      <View style={styles.text}></View>
      <View style={styles.button}></View>
      <View style={styles.divider}></View>
      <View style={styles.text}></View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalScroll}
      >
        {[...Array(5)].map((_, index) => (
          <View key={index} style={styles.castContainer}>
            <View style={styles.castImage}></View>
            <View style={styles.castName}></View>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202830",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 480,
    backgroundColor: "#627482",
    marginBottom: 20,
    opacity: 0.1,
  },
  text: {
    height: 20,
    backgroundColor: "#627482",
    marginBottom: 20,
    opacity: 0.1,
  },
  button: {
    width: "50%",
    height: 40,
    backgroundColor: "#627482",
    alignSelf: "center",
    marginBottom: 20,
    opacity: 0.1,
  },
  divider: {
    height: 1,
    backgroundColor: "#627482",
    marginBottom: 20,
    opacity: 0.1,
  },
  horizontalScroll: {
    marginBottom: 20,
  },
  castContainer: {
    marginRight: 16,
    alignItems: "center",
    paddingHorizontal: 4,
  },
  castImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#627482",
    marginBottom: 12,
    opacity: 0.1,
  },
  castName: {
    height: 10,
    width: 60,
    backgroundColor: "#627482",
    opacity: 0.1,
  },
});

export default LoadingSkeleton;
