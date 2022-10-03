import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Photo = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Text>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Photo;
