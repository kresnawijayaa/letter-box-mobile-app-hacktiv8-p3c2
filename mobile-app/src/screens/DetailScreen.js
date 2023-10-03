import { useEffect, useState } from "react";
import {
  Pressable,
  Image,
  Text,
  View,
  Linking,
  StyleSheet,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { gql, useQuery } from "@apollo/client";
import LoadingSkeleton from "../components/LoadingSkeleton";

const GET_MOVIES = gql`
  query Query($slug: String) {
    movieBySlug(slug: $slug) {
      id
      title
      slug
      synopsis
      trailerUrl
      imgUrl
      rating
      genreId
      UserMongoId
      Genre {
        name
      }
      Casts {
        profilePict
        name
      }
      User {
        username
        email
      }
    }
  }
`;

export default function DetailScreen({ route }) {
  const [isPressed, setIsPressed] = useState(false);
  const { slug } = route.params;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  const { data, error, loading } = useQuery(GET_MOVIES, {
    variables: {
      slug: slug,
    },
  });

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error...</Text>;
  }

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#202830" }}>
      <View>
        <LinearGradient
          start={{ x: "0%", y: "20%" }}
          end={{ x: "100%", y: "80%" }}
          locations={[0, 0.9]}
          colors={["transparent", "#202830"]}
          style={{
            height: 502,
            position: "absolute",
            width: "100%",
            zIndex: 1,
          }}
        ></LinearGradient>
        <Image
          source={{
            uri: data?.movieBySlug?.imgUrl,
          }}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            width: "100%",
            height: 480,
          }}
        />

        <Text
          style={{
            color: "white",
            fontSize: data?.movieBySlug?.title?.length < 25 ? 36 : 28, // Sesuaikan dengan ukuran font yang Anda inginkan
            fontWeight: "bold", // Sesuaikan dengan gaya font yang Anda inginkan
            textAlign: "center",
            position: "absolute",
            marginTop: data?.movieBySlug?.title?.length < 25 ? 400 : 380,
            zIndex: 1,
            width: "100%",
            paddingHorizontal: 20,
          }}
        >
          {data?.movieBySlug?.title}
        </Text>
        <Text
          style={{
            marginTop: 14,
            color: "white",
            fontSize: 12, // Sesuaikan dengan ukuran font yang Anda inginkan
            fontWeight: "normal", // Sesuaikan dengan gaya font yang Anda inginkan
            textAlign: "center",
            position: "absolute",
            marginTop: 468,
            zIndex: 1,
            width: "100%",
            paddingHorizontal: 20,
          }}
        >
          ⭐ {data?.movieBySlug?.rating}/5 🍿{data?.movieBySlug?.Genre?.name}
        </Text>
        <Text
          style={{
            marginTop: 22,
            color: "white",
            fontSize: 12, // Sesuaikan dengan ukuran font yang Anda inginkan
            fontWeight: "normal", // Sesuaikan dengan gaya font yang Anda inginkan
            textAlign: "center",
            opacity: 0.6,
            marginHorizontal: 40,
            lineHeight: 18,
          }}
        >
          {data?.movieBySlug?.synopsis}
        </Text>

        <Pressable
          onPress={() => {
            Linking.openURL(data?.movieBySlug?.trailerUrl); // Replace with your URL
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
              Watch Trailer
            </Text>
          )}
        </Pressable>
        <View
          style={{
            marginHorizontal: 40,
            marginTop: 40,
            marginBottom: 28,
            opacity: 0.2,
            borderBottomColor: "#fff", // Ubah warna sesuai kebutuhan
            borderBottomWidth: 1, // Ubah ketebalan sesuai kebutuhan
          }}
        />
        <Text
          style={{
            color: "white",
            fontSize: 20, // Sesuaikan dengan ukuran font yang Anda inginkan
            fontWeight: "bold", // Sesuaikan dengan gaya font yang Anda inginkan
            marginHorizontal: 40,
          }}
        >
          Casts
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false} // Menyembunyikan indikator gulir horizontal
          style={{
            marginVertical: 20,
            paddingHorizontal: 40, // Padding horizontal untuk memberikan jarak pada sisi kiri dan kanan
          }}
        >
          {data?.movieBySlug?.Casts?.map((cast, index) => (
            <View
              key={index}
              style={{
                marginRight: 16,
                alignItems: "center",
                paddingHorizontal: 4,
              }}
            >
              <Image
                source={{ uri: cast.profilePict }}
                style={{
                  width: 60, // Lebar gambar pemeran
                  height: 60, // Tinggi gambar pemeran
                  borderRadius: "100%", // Membuat sudut gambar menjadi bulat
                }}
              />
              <Text
                style={{
                  marginTop: 12, // Jarak antara gambar dan nama pemeran
                  textAlign: "center",
                  color: "white",
                  fontSize: 10,
                  opacity: 0.6,
                }}
              >
                {cast.name?.length > 10
                  ? cast.name.slice(0, 10) + ".."
                  : cast.name}
              </Text>
            </View>
          ))}
        </ScrollView>
        <View
          style={{
            marginHorizontal: 40,
            marginTop: 16,
            marginBottom: 28,
            opacity: 0.2,
            borderBottomColor: "#fff", // Ubah warna sesuai kebutuhan
            borderBottomWidth: 1, // Ubah ketebalan sesuai kebutuhan
          }}
        />
        <Text
          style={{
            color: "white",
            fontSize: 20, // Sesuaikan dengan ukuran font yang Anda inginkan
            fontWeight: "bold", // Sesuaikan dengan gaya font yang Anda inginkan
            marginHorizontal: 40,
          }}
        >
          Author
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 16, // Sesuaikan dengan ukuran font yang Anda inginkan
            fontWeight: "normal", // Sesuaikan dengan gaya font yang Anda inginkan
            marginHorizontal: 40,
            marginTop: 14,
            marginBottom: 40,
            opacity: 0.4,
          }}
        >
          {data?.movieBySlug?.User?.username} ({data?.movieBySlug?.User?.email})
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    paddingVertical: 12,
    marginHorizontal: 120,
    marginTop: 24,
  },
  text: {
    fontSize: 14,
    textAlign: "center",
  },
});
