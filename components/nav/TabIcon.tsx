import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface ITabIconProps {
  iconName: "home" | "search" | "add-circle" | "heart" | "person";
  focused: boolean;
  color: string;
}

const TabIcon = ({ iconName, color, focused }: ITabIconProps) => {
  return (
    <Ionicons
      name={focused ? iconName : `${iconName}-outline`}
      color={color}
      size={22}
    />
  );
};

export default TabIcon;
