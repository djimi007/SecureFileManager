import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { Directions, Gesture, GestureDetector } from "react-native-gesture-handler";
import { Surface } from "react-native-paper";
import Animated, { FadeIn, SlideInLeft, SlideInRight } from "react-native-reanimated";
import { useFileFetch } from "../../AppState/fetchFiles";
import { hp, wp } from "../../utils/dimonsions";

import { Entypo, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import Share from "react-native-share";
import { useLayoutState } from "../../AppState/fabvisible";

interface Prpos {
  setFileName: React.Dispatch<React.SetStateAction<string | string[]>>;
  path: string | string[];
}

export default function PageView({ path, setFileName }: Prpos) {
  const { getImage, images, editFile } = useFileFetch();

  const { setFabVisible } = useLayoutState();

  const [displayedPath, setDisplayedPath] = useState<string | string[]>(path);
  const item = getImage(displayedPath);

  const [selectedItem, setSelectedItem] = useState<number>(images.indexOf(item));

  useEffect(() => {
    setFabVisible(false);
  }, []);

  enum EnteringProps {
    NULL,
    RIGHT,
    LEFT,
  }

  const AnimatedSurface = Animated.createAnimatedComponent(Surface);

  const [entering, setEntering] = useState<EnteringProps>(EnteringProps.NULL);

  const compose = Gesture.Race(
    Gesture.Fling()
      .direction(Directions.RIGHT)
      .onEnd(() => {
        const newSelectedItem = selectedItem - 1;
        setEntering(EnteringProps.LEFT);
        if (newSelectedItem < 0) return;
        setSelectedItem(newSelectedItem);
        setDisplayedPath(images.at(newSelectedItem)!.path);
        setFileName(images.at(newSelectedItem)!.filename);
      })
      .runOnJS(true),
    Gesture.Fling()
      .direction(Directions.LEFT)
      .onEnd(() => {
        setEntering(EnteringProps.RIGHT);
        if (selectedItem > images.length - 2) return;
        const newSelectedItem = selectedItem + 1;
        setSelectedItem(newSelectedItem);
        setDisplayedPath(images.at(newSelectedItem)!.path);
        setFileName(images.at(newSelectedItem)!.filename);
      })
      .runOnJS(true)
  );

  return (
    <>
      <GestureDetector gesture={compose}>
        <AnimatedSurface
          entering={
            entering === EnteringProps.NULL
              ? FadeIn
              : entering === EnteringProps.LEFT
              ? SlideInLeft
              : SlideInRight
          }
          theme={{ colors: { elevation: "black" } }}
          elevation={5}
          style={{
            backgroundColor: "white",
            alignItems: "center",
            borderRadius: wp(15),
            overflow: "hidden",
          }}
        >
          <Image
            key={selectedItem}
            source={{ uri: `file://${displayedPath.toLocaleString()}` }}
            style={{ width: wp(88), height: hp(73) }}
          />
        </AnimatedSurface>
      </GestureDetector>
      <View
        style={{
          flexDirection: "row",
          width: wp(100),
          justifyContent: "space-evenly",
          marginTop: hp(4),
        }}
      >
        <Entypo
          name="share"
          size={wp(8)}
          color="black"
          onPress={() => {
            Share.open({ url: `file://${displayedPath.toLocaleString()}` });
          }}
        />
        <Feather
          name="edit"
          size={wp(8)}
          color="black"
          onPress={() => {
            setEntering(EnteringProps.NULL);
          }}
        />
        <MaterialCommunityIcons name="delete" size={wp(8)} color="black" />
      </View>
    </>
  );
}
