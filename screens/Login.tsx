import React, { RefObject, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import AuthLayout from "../components/AuthLayout";
import AuthButton from "../components/Button";
import { Input } from "../components/shared";

const Login = ({ navigation }: any) => {
  const { register, handleSubmit, setValue } = useForm();
  const passwordRef = useRef<TextInput | null>(null);
  const onNext = (nextOne: RefObject<TextInput | null>) => {
    nextOne?.current?.focus();
  };
  const onValid = (data: any) => {
    console.log(data);
  };

  useEffect(() => {
    register("username", {
      required: true,
    });
    register("password", {
      required: true,
    });
  }, [register]);
  return (
    <AuthLayout>
      <Input
        placeholder="아이디"
        placeholderTextColor="gray"
        returnKeyType="next"
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text: any) => setValue("username", text)}
      />
      <Input
        ref={passwordRef}
        placeholder="비밀번호"
        placeholderTextColor="gray"
        secureTextEntry
        returnKeyType="done"
        lastOne={true}
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text: any) => setValue("password", text)}
      />
      <AuthButton
        text="로그인"
        disalbed={false}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
};

export default Login;
