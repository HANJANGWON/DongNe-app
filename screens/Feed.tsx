import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Feed = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity onPress={() => navigation.navigate("Photo")}>
        <Text>Photo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Feed;