import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import MainTab from "./src/navigator/MainTab";

const client = new ApolloClient({
  uri: "https://apollo.kresnawijaya.tech/",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <MainTab />
        </NavigationContainer>
      </View>
    </ApolloProvider>
  );
}
