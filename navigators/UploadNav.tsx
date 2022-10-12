import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SelectPhoto from "../screens/SelectPhoto";
import TakePhoto from "../screens/TakePhoto";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const UploadNav = () => {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: "black",
          top: 0,
        },
      }}
    >
      <Tab.Screen name="Select">
        {({ navigation }) => (
          <Stack.Navigator
            screenOptions={{
              headerTintColor: "black",
              headerLeft: ({ tintColor }: any) => (
                <Ionicons
                  onPress={() => navigation.navigate("Tabs")}
                  color={tintColor}
                  name="close"
                  size={28}
                />
              ),
              headerStyle: {
                backgroundColor: "white",
              },
            }}
          >
            <Stack.Screen
              name="Select"
              options={{ title: "Choose a photo" }}
              component={SelectPhoto}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="Take" component={TakePhoto} />
    </Tab.Navigator>
  );
};

export default UploadNav;
