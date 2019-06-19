import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { TakePicScreen, ReviewPicScreen } from "./src/screens";

const AppStackNavigator = createStackNavigator(
  {
    TakePic: {
      screen: TakePicScreen
    },
    ReviewPic: {
      screen: ReviewPicScreen
    }
  },
  {
    headerMode: "none"
  }
);

export default createAppContainer(AppStackNavigator);
