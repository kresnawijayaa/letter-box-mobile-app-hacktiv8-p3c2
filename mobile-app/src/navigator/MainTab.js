import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../screens/ProfileScreen";
import MainStack from "./MainStack";
import { MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "#202830" }, // Ganti dengan warna latar belakang yang Anda inginkan
        activeTintColor: "#FF8000", // Warna ikon tab yang aktif
        inactiveTintColor: "gray", // Warna ikon tab yang tidak aktif
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={MainStack}
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Info"
        component={ProfileScreen}
        options={{
          title: "Info",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="info" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
