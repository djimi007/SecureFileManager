import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { Directions, Gesture, GestureDetector } from "react-native-gesture-handler";
import { Modal, Portal, Surface } from "react-native-paper";
import Animated, { FadeIn, SlideInLeft, SlideInRight } from "react-native-reanimated";
import { useFileFetch } from "../../AppState/fetchFiles";
import { hp, wp } from "../../utils/dimonsions";

import { useLayoutState } from "../../AppState/fabvisible";
import { Entypo, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import Share from "react-native-share";
import { fs } from "../../utils/constant";
import MyDialog from "@components/paperUtils/dialogtest";

interface Prpos {
  setFileName: React.Dispatch<React.SetStateAction<string | string[]>>;
  path: string | string[];
}

export default function PageView({ path, setFileName }: Prpos) {
  const { getImage, images, editFile } = useFileFetch();

  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const { setFabVisible } = useLayoutState();

  const [displayedPath, setDisplayedPath] = useState(path);
  const item = getImage(path);

  const [selectedItem, setSelectedItem] = useState(images.indexOf(item));

  useEffect(() => {
    setFabVisible(false);
  }, []);

  enum EntringProps {
    NULL,
    RIGHT,
    LEFT,
  }

  const AnimatedSurface = Animated.createAnimatedComponent(Surface);

  const [entering, setEntring] = useState<EntringProps>(EntringProps.NULL);

  console.log(entering);

  const compose = Gesture.Race(
    Gesture.Fling()
      .direction(Directions.RIGHT)
      .onEnd(() => {
        const newSelectedItem = selectedItem - 1;
        setEntring(EntringProps.LEFT);
        if (selectedItem < 0) return;
        setSelectedItem(newSelectedItem);
        setDisplayedPath(images.at(newSelectedItem)!.path);
        setFileName(images.at(newSelectedItem)!.filename);
      })
      .runOnJS(true),
    Gesture.Fling()
      .direction(Directions.LEFT)
      .onEnd(() => {
        setEntring(EntringProps.RIGHT);
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
            entering === EntringProps.NULL
              ? FadeIn
              : entering === EntringProps.LEFT
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
            source={{ uri: `file://${displayedPath!.toLocaleString()}` }}
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
            Share.open({ url: `file://${displayedPath!.toLocaleString()}` });
          }}
        />
        <Feather
          name="edit"
          size={wp(8)}
          color="black"
          onPress={() => {
            setEntring(EntringProps.NULL);
            setVisible(true);
          }}
        />
        <MaterialCommunityIcons name="delete" size={wp(8)} color="black" />
      </View>
      <MyDialog visible={visible} setVisible={setVisible} />
    </>
  );
}
