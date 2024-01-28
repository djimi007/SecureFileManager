import React from "react";
import { View, Text } from "react-native";
import { CameraIcon, pages } from "../utils/pagesUtils";
import { AnimatedText } from "../utils/animationsCompnent";

const CameraComponent = () => (
  <View>
    <CameraIcon style={{ height: "70%", width: "80%" }} />
    <AnimatedText>{pages[0].title}</AnimatedText>
    <AnimatedText>{pages[0].content}</AnimatedText>
  </View>
);

export default CameraComponent;
