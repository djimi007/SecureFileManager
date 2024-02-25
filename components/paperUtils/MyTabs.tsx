import App from "../../app/(tabs)";
import CameraPage from "../../app/(tabs)/two";
import {
  BlackCameraTab,
  BlackFolderTab,
  WhiteCameraTab,
  WhiteFolderTab,
} from "../../utils/pages&svgUtils";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, Divider } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { wp } from "../../utils/dimonsions";
import { useLayoutState } from "../../AppState/fabvisible";
import ImagePage from "../../app/(tabs)/images";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";

const Tab = createMaterialBottomTabNavigator();
export default function MyTabs() {
  const setFabVisible = useLayoutState((state) => state.setFabVisible);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="inverted" backgroundColor="black" />
      <Appbar style={{ backgroundColor: "black" }}>
        <Appbar.Content
          title="ProGallery"
          color="white"
          titleStyle={{ fontSize: wp(6), fontWeight: "600" }}
        />
        <Appbar.Action icon={require("@/assets/data/change.png")} color="white" />
      </Appbar>

      <Tab.Navigator
        sceneAnimationEnabled
        barStyle={{ alignItems: "center", justifyContent: "center", backgroundColor: "#d3d3d3" }}
        activeIndicatorStyle={{
          height: wp(13),
          width: wp(13),
          backgroundColor: "black",
        }}
        compact
        sceneAnimationType="shifting"
        labeled={false}
        shifting
        initialRouteName="File"
      >
        <Tab.Screen
          name="File"
          component={App}
          listeners={{
            tabPress: () => {
              setFabVisible(true);
            },
          }}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <WhiteFolderTab height={wp(6)} width={wp(7)} />
              ) : (
                <BlackFolderTab height={wp(6)} width={wp(7)} />
              ),
          }}
        />
        <Tab.Screen
          name="Picture"
          listeners={{
            tabPress: () => {
              setFabVisible(false);
            },
          }}
          component={ImagePage}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Image
                  source={require("@/assets/data/milieux.png")}
                  style={{ height: wp(6), width: wp(6) }}
                />
              ) : (
                <Image
                  source={require("@/assets/data/milieux.png")}
                  style={{ height: wp(6), width: wp(6), tintColor: "black" }}
                />
              ),
          }}
        />
        <Tab.Screen
          name="Camera"
          listeners={{
            tabPress: () => {
              setFabVisible(false);
            },
          }}
          component={CameraPage}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <WhiteCameraTab height={wp(7)} width={wp(8)} />
              ) : (
                <BlackCameraTab height={wp(7)} width={wp(8)} />
              ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
