import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import AuthLayout from "../components/AuthLayout";
import AuthButton from "../components/Button";

const LoginLink = styled.Text`
  color: #0095f6;
  font-weight: 600;
  margin-top: 20px;
  text-align: center;
`;

const Welcome = ({ navigation }: any) => {
  const goToCreateAccount = () => navigation.navigate("CreateAccount");
  const goToLogin = () => navigation.navigate("Login");
  return (
    <AuthLayout>
      <AuthButton
        text="회원가입"
        disalbed={false}
        onPress={goToCreateAccount}
      />
      <TouchableOpacity onPress={goToLogin}>
        <LoginLink>로그인</LoginLink>
      </TouchableOpacity>
    </AuthLayout>
  );
};

export default Welcome;
