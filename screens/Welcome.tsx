import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: "white";
  padding: 0px 40px;
`;

const Logo = styled.Image`
  max-width: 15%;
  height: 200px;
`;

const CreateAccount = styled.TouchableOpacity`
  background-color: #0095f6;
  padding: 13px 10px;
  margin-top: 20px;
  border-radius: 7px;
  width: 100%;
  opacity: ${(props) => (props.disabled ? "0.5" : 1)};
`;
const CreateAccountText = styled.Text`
  color: white;
  font-weight: 600;
  text-align: center;
`;

const LoginLink = styled.Text`
  color: #0095f6;
  font-weight: 600;
  margin-top: 20px;
`;

const Welcome = ({ navigation }: any) => {
  const goToCreateAccount = () => navigation.navigate("CreateAccount");
  const goToLogin = () => navigation.navigate("Login");
  return (
    <Container>
      <Logo resizeMode="contain" source={require("../assets/logo.png")} />
      <CreateAccount disabled={false} onPress={goToCreateAccount}>
        <CreateAccountText>회원가입</CreateAccountText>
      </CreateAccount>
      <TouchableOpacity onPress={goToLogin}>
        <LoginLink>로그인</LoginLink>
      </TouchableOpacity>
    </Container>
  );
};

export default Welcome;
