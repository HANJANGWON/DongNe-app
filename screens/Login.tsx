import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Login = ({ navigation }: any) => {
  return (
    <View>
      <Text>Login</Text>
      <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
        <Text>Go to Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
