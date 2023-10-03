import { Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CardMovie({ movie }) {
  const navigation = useNavigation();

  return (
    <Pressable
      style={{ marginRight: 8 }}
      onPress={() => {
        navigation.navigate("Detail", { slug: movie.slug });
      }}
    >
      <Image
        source={{
          uri: movie.imgUrl,
        }}
        style={{
          width: 116,
          height: 180,
          borderRadius: 8,
          borderWidth: 0.4,
          borderColor: "white",
        }}
      />
    </Pressable>
  );
}
