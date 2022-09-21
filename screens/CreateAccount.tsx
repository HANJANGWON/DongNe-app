import React, { RefObject, useRef } from "react";
import { KeyboardAvoidingView, Platform, TextInput } from "react-native";
import styled from "styled-components/native";
import AuthLayout from "../components/AuthLayout";
import AuthButton from "../components/Button";
import { Input } from "../components/shared";

const CreateAccount = () => {
  const fullNameRef = useRef<TextInput | null>(null);
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const onNext = (nextOne: RefObject<TextInput | null>) => {
    nextOne?.current?.focus();
  };
  const onDone = () => {
    alert("done!");
  };
  return (
    <AuthLayout>
      <Input
        placeholder="아이디"
        placeholderTextColor="gray"
        returnKeyType="next"
        onSubmitEditing={() => onNext(fullNameRef)}
      />
      <Input
        ref={fullNameRef}
        placeholder="이름"
        placeholderTextColor="gray"
        returnKeyType="next"
        onSubmitEditing={() => onNext(emailRef)}
      />

      <Input
        ref={emailRef}
        placeholder="이메일"
        keyboardType="email-address"
        placeholderTextColor="gray"
        returnKeyType="next"
        onSubmitEditing={() => onNext(passwordRef)}
      />
      <Input
        ref={passwordRef}
        placeholder="비밀번호"
        placeholderTextColor="gray"
        secureTextEntry
        returnKeyType="done"
        onSubmitEditing={onDone}
        lastOne={true}
      />
      <AuthButton text="회원가입" disalbed={true} onPress={() => null} />
    </AuthLayout>
  );
};

export default CreateAccount;
