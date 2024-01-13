import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";
import { deafaultStyle } from "../../constants/styles";

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
              style={deafaultStyle.tabicons}
            />
          ),
          headerRight: () => (
            <Link href={"/testPage"} asChild>
              <Pressable style={{ padding: 5, marginRight: "5%" }}>
                <MaterialIcons
                  name="account-circle"
                  size={24}
                  color="black"
                />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Tab Two",
          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/1.png")}
              style={deafaultStyle.tabicons}
            />
          ),
        }}
      />
    </Tabs>
  );
}
