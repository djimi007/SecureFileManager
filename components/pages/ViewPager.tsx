import { Surface } from "react-native-paper";
import { Image } from "expo-image";
import { wp, hp } from "../../utils/dimonsions";
import { Directions, Gesture, GestureDetector } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { useFileFetch } from "../../AppState/fetchFiles";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInLeft,
  SlideInRight,
  SlideInUp,
  runOnJS,
} from "react-native-reanimated";

import Share from "react-native-share";
import { ToastAndroid } from "react-native";
import { useLayoutState } from "../../AppState/fabvisible";

export default function PageView({ path }: { path: string | string[] }) {
  const { getImage, images } = useFileFetch();

  const { setFabVisible } = useLayoutState();

  const [displayedPath, setDisplayedPath] = useState(path);
  const item = getImage(path);

  const [selectedItem, setSelectedItem] = useState(images.indexOf(item));

  useEffect(() => {
    setFabVisible(false);
  }, []);

  enum EntringProps {
    null,
    Right,
    Left,
  }

  const AnimatedSurface = Animated.createAnimatedComponent(Surface);

  const [entering, setEntring] = useState<EntringProps>(EntringProps.null);

  const compose = Gesture.Race(
    Gesture.Fling()
      .direction(Directions.RIGHT)
      .onEnd(() => {
        setEntring(EntringProps.Left);
        if (selectedItem < 0) return;
        setSelectedItem(selectedItem - 1);
        setDisplayedPath(images.at(selectedItem - 1)!.path);
      })
      .runOnJS(true),
    Gesture.Fling()
      .direction(Directions.LEFT)
      .onEnd(() => {
        setEntring(EntringProps.Right);
        if (selectedItem > images.length - 2) return;

        setSelectedItem(selectedItem + 1);
        setDisplayedPath(images.at(selectedItem + 1)!.path);
      })
      .runOnJS(true),
    Gesture.Fling()
      .direction(Directions.UP)

      .onEnd(() => {
        Share.open({
          url: `file://${displayedPath!.toLocaleString()}`,
        })
          .then((e) => {
            if (e.success) {
              ToastAndroid.show("Picture Sended Seccessfully", ToastAndroid.LONG);
            } else {
              ToastAndroid.show("Picture Send Cancled", ToastAndroid.LONG);
            }
          })
          .catch((e) => {
            console.log(e.message);
          });
      })
      .runOnJS(true)
  );

  return (
    <GestureDetector gesture={compose}>
      <AnimatedSurface
        entering={
          entering === EntringProps.null
            ? FadeIn
            : entering === EntringProps.Left
            ? SlideInLeft
            : SlideInRight
        }
        theme={{ colors: { elevation: "black" } }}
        elevation={5}
        style={{
          alignItems: "center",
          borderRadius: wp(15),
          overflow: "hidden",
        }}
      >
        <Image
          // placeholder={b}
          key={selectedItem}
          source={{ uri: `file://${displayedPath!.toLocaleString()}` }}
          style={{ width: wp(88), height: hp(75) }}
        />
      </AnimatedSurface>
    </GestureDetector>
  );
}
