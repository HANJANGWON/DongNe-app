import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabsNav from "./TabsNav";
import UploadNav from "./UploadNav";
import UploadForm from "../screens/UploadForm";
import { Ionicons } from "@expo/vector-icons";
import MessagesNav from "./MessageNav";

const Stack = createNativeStackNavigator();
const LoggedInNav = () => {
  return (
    <Stack.Navigator screenOptions={{ presentation: "card" }}>
      <Stack.Screen
        name="Tabs"
        options={{ headerShown: false }}
        component={TabsNav}
      />
      <Stack.Screen
        name="Upload"
        options={{ headerShown: false }}
        component={UploadNav}
      />
      <Stack.Screen
        name="UploadForm"
        options={{
          headerTintColor: "black",
          headerBackTitleVisible: false,
          title: "Upload",
        }}
        component={UploadForm}
      />
      <Stack.Screen
        name="Messages"
        options={{ headerShown: false }}
        component={MessagesNav}
      />
    </Stack.Navigator>
  );
};

export default LoggedInNav;
