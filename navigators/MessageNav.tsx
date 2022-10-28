import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Room from "../screens/Room";
import Rooms from "../screens/Rooms";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

const MessagesNav = ({ navigation }: any) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        presentation: "card",
        headerTintColor: "black",
      }}
    >
      <Stack.Screen name="Rooms" component={Rooms} />
      <Stack.Screen name="Room" component={Room} />
    </Stack.Navigator>
  );
};

export default MessagesNav;
