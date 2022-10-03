import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feed from "../screens/Feed";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import { View } from "react-native";
import TabIcon from "../components/nav/TabIcon";
import Me from "../screens/Me";
import StackNavFactory from "./StackNavFactory";

const Tabs = createBottomTabNavigator();
const LoggedInNav = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: "black",
        headerShown: false,
        tabBarStyle: {
          borderTopColor: "rgba(255,255,255,0.5)",
        },
      }}
    >
      <Tabs.Screen
        name="TabFeed"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"home"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Feed" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="TabSearch"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"search"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Search" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="TabCamera"
        component={View}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"add-circle"} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="TabNotifications"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"heart"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Notifications" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="TabMe"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"person"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Me" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
};

export default LoggedInNav;
