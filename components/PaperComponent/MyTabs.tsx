import { Image } from "expo-image";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { useFoucsed } from "../../AppState/backState";
import { useLayoutState } from "../../AppState/fabvisible";
import { Colors } from "../../constants/Colors";
import { hp, wp } from "../../utils/dimonsions";
import {
  BlackCameraTab,
  BlackFolderTab,
  WhiteCameraTab,
  WhiteFolderTab,
} from "../../utils/pages&svgUtils";

export default function MyTabs() {
  const setFabVisible = useLayoutState((state) => state.setFabVisible);

  const { setIsFoucsed } = useFoucsed();

  return (
    <Tabs
      screenOptions={{
        title: "ProGallery",
        headerTitleStyle: { fontSize: wp(6) },
        headerTintColor: "white",
        tabBarShowLabel: false,
        headerStyle: { backgroundColor: "black" },
        tabBarStyle: {
          backgroundColor: Colors.background,
          paddingVertical: hp(5),
        },
        headerRight: () => (
          <Image
            style={{
              tintColor: "white",
              height: wp(6),
              width: wp(5),
              marginRight: wp(4),
            }}
            source={require("@/assets/data/change.png")}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        listeners={{
          tabPress: () => {
            setIsFoucsed(true);
            setFabVisible(true);
          },
        }}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={{
                  padding: wp(2),
                  backgroundColor: "black",
                  borderRadius: wp(2.5),
                }}
              >
                <WhiteFolderTab height={wp(7)} width={wp(7)} />
              </View>
            ) : (
              <View>
                <BlackFolderTab height={wp(7)} width={wp(7)} />
              </View>
            ),
        }}
      />
      <Tabs.Screen
        name="images"
        listeners={{
          tabPress: () => {
            setIsFoucsed(false);
            setFabVisible(false);
          },
        }}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={{
                  padding: wp(3),
                  backgroundColor: "black",
                  borderRadius: wp(2.5),
                }}
              >
                <Image
                  source={require("@/assets/data/milieux.png")}
                  style={{ height: wp(6), width: wp(6) }}
                />
              </View>
            ) : (
              <Image
                source={require("@/assets/data/milieux.png")}
                style={{ height: wp(6), width: wp(6), tintColor: "black" }}
              />
            ),
        }}
      />
      <Tabs.Screen
        name="camera"
        listeners={{
          tabPress: () => {
            setIsFoucsed(false);
            setFabVisible(false);
          },
        }}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={{
                  padding: wp(2),
                  backgroundColor: "black",
                  borderRadius: wp(2.5),
                }}
              >
                <WhiteCameraTab height={wp(7)} width={wp(8)} />
              </View>
            ) : (
              <BlackCameraTab height={wp(7)} width={wp(8)} />
            ),
        }}
      />
    </Tabs>
  );
}
