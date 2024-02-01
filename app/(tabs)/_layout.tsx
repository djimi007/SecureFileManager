import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { Pressable, useColorScheme, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "FileManager",
          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/1.png")}
              style={{ width: 24, height: 24 }}
            />
          ),
          headerRight: () => (
            <Pressable style={{ padding: 5, marginRight: "5%" }}>
              <MaterialIcons name="account-circle" size={24} color="black" />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/1.png")}
              style={{ height: 24, width: 24 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
