import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AuthLayout from "../components/AuthLayout";
import { Input } from "../components/shared";

const Login = ({ navigation }: any) => {
  return (
    <AuthLayout>
      <Input
        placeholder="아이디"
        placeholderTextColor="gray"
        returnKeyType="next"
      />
      <Input
        placeholder="비밀번호"
        placeholderTextColor="gray"
        secureTextEntry
        returnKeyType="done"
        lastOne={true}
      />
    </AuthLayout>
  );
};

export default Login;
