import { SafeAreaView, StyleSheet, Image, View, Text } from "react-native";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          source={{
            uri: "https://a.ltrbxd.com/logos/letterboxd-logo-h-neg-rgb-1000px.png",
          }}
          style={{
            height: 52,
            marginVertical: 12,
            objectFit: "contain",
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          padding: 24,
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold", // Sesuaikan dengan gaya font yang Anda inginkan
            // textAlign: "center",
            fontSize: 24,
            paddingHorizontal: 20,
            paddingTop: 60,
            opacity: 0.6,
          }}
        >
          Hi Movie Hunter! 🎬
        </Text>
        <Text
          style={{
            marginTop: 32,
            color: "white",
            fontSize: 12, // Sesuaikan dengan ukuran font yang Anda inginkan
            fontWeight: "normal", // Sesuaikan dengan gaya font yang Anda inginkan
            opacity: 0.6,
            marginHorizontal: 20,
            lineHeight: 18,
            lineHeight: 20,
          }}
        >
          We are thrilled to see your enthusiasm for LetterBox!
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 12, // Sesuaikan dengan ukuran font yang Anda inginkan
            fontWeight: "normal", // Sesuaikan dengan gaya font yang Anda inginkan
            opacity: 0.6,
            marginHorizontal: 20,
            lineHeight: 18,
            lineHeight: 20,
          }}
        >
          Your passion for movies is what drives us to create the best possible
          experience for you.
        </Text>
        <Text
          style={{
            marginTop: 20,
            color: "white",
            fontSize: 12, // Sesuaikan dengan ukuran font yang Anda inginkan
            fontWeight: "normal", // Sesuaikan dengan gaya font yang Anda inginkan
            opacity: 0.6,
            marginHorizontal: 20,
            lineHeight: 18,
            lineHeight: 20,
          }}
        >
          Currently, we are in the midst of developing some exciting new
          features to make your LetterBox experience even more enjoyable. We
          sincerely apologize for any inconvenience this may cause and
          appreciate your patience as we work to bring you the best.
        </Text>
        <Text
          style={{
            marginTop: 20,
            color: "white",
            fontSize: 12, // Sesuaikan dengan ukuran font yang Anda inginkan
            fontWeight: "normal", // Sesuaikan dengan gaya font yang Anda inginkan
            opacity: 0.6,
            marginHorizontal: 20,
            lineHeight: 18,
            lineHeight: 20,
          }}
        >
          We can't wait to share what we have in store, and we promise it will
          be worth the wait. In the meantime, keep hunting for those hidden gems
          and blockbuster favorites!
        </Text>
        <Text
          style={{
            marginTop: 20,
            color: "white",
            fontSize: 12, // Sesuaikan dengan ukuran font yang Anda inginkan
            fontWeight: "normal", // Sesuaikan dengan gaya font yang Anda inginkan
            opacity: 0.6,
            marginHorizontal: 20,
            lineHeight: 18,
            lineHeight: 20,
          }}
        >
          Thank you for your understanding and continued support. Happy movie
          hunting!
        </Text>
        <Text
          style={{
            textAlign: "right",
            marginTop: 64,
            color: "white",
            fontSize: 12, // Sesuaikan dengan ukuran font yang Anda inginkan
            fontWeight: "normal", // Sesuaikan dengan gaya font yang Anda inginkan
            opacity: 0.6,
            marginHorizontal: 20,
            lineHeight: 18,
          }}
        >
          The LetterBox Team 🍿
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202830",
    flex: 1,
  },
});
