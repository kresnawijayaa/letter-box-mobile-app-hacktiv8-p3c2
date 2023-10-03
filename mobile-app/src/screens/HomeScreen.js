import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  FlatList,
  Text,
} from "react-native";
import CardMovie from "../components/CardMovie";
import { gql, useQuery } from "@apollo/client";
import CardMovieSkeleton from "../components/CardMovieSkeleton";

const GET_ALL_MOVIES = gql`
  query Query {
    movies {
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
        id
        name
        createdAt
        updatedAt
      }
      Casts {
        id
        name
        profilePict
        movieId
        createdAt
        updatedAt
      }
      User {
        _id
        username
        email
        role
        phoneNumber
        address
      }
    }
  }
`;

export default function HomeScreen() {
  const { data, error, loading } = useQuery(GET_ALL_MOVIES);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
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
        <View style={{ flex: 1, padding: 24 }}>
          <FlatList
            data={[...Array(9)]}
            renderItem={({ item, index }) => <CardMovieSkeleton key={index} />}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            contentContainerStyle={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              paddingHorizontal: "auto",
              gap: 8,
            }}
          />
        </View>
      </SafeAreaView>
    );
  }

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error...</Text>;
  }

  const movies = data.movies;

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
      <View style={{ flex: 1, padding: 24 }}>
        <FlatList
          data={movies}
          renderItem={({ item }) => <CardMovie key={item.id} movie={item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            paddingHorizontal: "auto",
            gap: 8,
          }}
        />
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
