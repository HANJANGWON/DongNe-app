import React, { useEffect } from "react";
import { Text, View } from "react-native";
import useMe from "../hooks/useMe";

const Me = ({ navigation }: any) => {
  const { data } = useMe();
  useEffect(() => {
    navigation.setOptions({
      title: data?.me?.username,
    });
  }, []);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Me</Text>
    </View>
  );
};

export default Me;
