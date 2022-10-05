import React from "react";
import { ActivityIndicator, View } from "react-native";

const ScreenLayout = ({ loading, children }: any) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {loading ? <ActivityIndicator /> : children}
    </View>
  );
};

export default ScreenLayout;
