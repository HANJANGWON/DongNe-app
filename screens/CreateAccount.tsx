import React, { RefObject, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, TextInput } from "react-native";
import styled from "styled-components/native";
import AuthLayout from "../components/AuthLayout";
import AuthButton from "../components/Button";
import { Input } from "../components/shared";

const CreateAccount = () => {
  const { register, handleSubmit, setValue } = useForm();
  const fullNameRef = useRef<TextInput | null>(null);
  const emailRef = useRef<TextInput | null>(null);
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
    register("fullName", {
      required: true,
    });
    register("email", {
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
        onSubmitEditing={() => onNext(fullNameRef)}
        onChangeText={(text: any) => setValue("username", text)}
      />
      <Input
        ref={fullNameRef}
        placeholder="이름"
        placeholderTextColor="gray"
        returnKeyType="next"
        onSubmitEditing={() => onNext(emailRef)}
        onChangeText={(text: any) => setValue("fullName", text)}
      />

      <Input
        ref={emailRef}
        placeholder="이메일"
        keyboardType="email-address"
        placeholderTextColor="gray"
        returnKeyType="next"
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text: any) => setValue("email", text)}
      />
      <Input
        ref={passwordRef}
        placeholder="비밀번호"
        placeholderTextColor="gray"
        secureTextEntry
        returnKeyType="done"
        onSubmitEditing={handleSubmit(onValid)}
        lastOne={true}
        onChangeText={(text: any) => setValue("password", text)}
      />
      <AuthButton
        text="회원가입"
        disalbed={false}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
};

export default CreateAccount;
