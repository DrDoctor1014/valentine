import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ValentineColors } from "@/constants/theme";

import WelcomeScreen from "@/screens/WelcomeScreen";
import GiftSelectionScreen from "@/screens/GiftSelectionScreen";
import LoveNoteScreen from "@/screens/LoveNoteScreen";
import GiftCardScreen from "@/screens/GiftCardScreen";
import MusicVideoScreen from "@/screens/MusicVideoScreen";
import FinalBouquetScreen from "@/screens/FinalBouquetScreen";

export type RootStackParamList = {
  Welcome: undefined;
  GiftSelection: undefined;
  LoveNote: undefined;
  GiftCard: undefined;
  MusicVideo: undefined;
  FinalBouquet: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: ValentineColors.background,
        },
        animation: "fade",
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="GiftSelection" component={GiftSelectionScreen} />
      <Stack.Screen
        name="LoveNote"
        component={LoveNoteScreen}
        options={{
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="GiftCard"
        component={GiftCardScreen}
        options={{
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="MusicVideo"
        component={MusicVideoScreen}
        options={{
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="FinalBouquet"
        component={FinalBouquetScreen}
        options={{
          animation: "fade",
        }}
      />
    </Stack.Navigator>
  );
}
