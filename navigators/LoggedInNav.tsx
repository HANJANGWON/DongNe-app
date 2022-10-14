import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabsNav from "./TabsNav";
import UploadNav from "./UploadNav";

const Stack = createNativeStackNavigator();
const LoggedInNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: "containedTransparentModal",
      }}
    >
      <Stack.Screen name="Tabs" component={TabsNav} />
      <Stack.Screen name="Upload" component={UploadNav} />
    </Stack.Navigator>
  );
};

export default LoggedInNav;
