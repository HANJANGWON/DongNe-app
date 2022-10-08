import React, { useEffect } from "react";
import { Text, View } from "react-native";

const Profile = ({ navigation, route }: any) => {
  useEffect(() => {
    if (route?.params?.username) {
      navigation.setOptions({
        title: route.params.username,
      });
    }
  }, []);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Someones Profile</Text>
    </View>
  );
};

export default Profile;
