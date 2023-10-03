import React from "react";
import { View, StyleSheet, Pressable, Image } from "react-native";

const CardMovieSkeleton = () => {
  return (
    <Pressable style={styles.card}>
      <View style={styles.image}></View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    marginRight: 8,
  },
  image: {
    width: 116,
    height: 180,
    borderRadius: 8,
    borderWidth: 0.4,
    borderColor: "white",
    backgroundColor: "#627482",
    opacity: 0.1,
  },
});

export default CardMovieSkeleton;
