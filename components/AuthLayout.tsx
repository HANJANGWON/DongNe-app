import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components/native";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: "white";
  padding: 0px 40px;
`;

const Logo = styled.Image`
  max-width: 15%;
  width: 100%;
  height: 200px;
  margin-bottom: 20px;
`;

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={dismissKeyboard}>
      <Container>
        <KeyboardAvoidingView
          style={{
            width: "100%",
          }}
          behavior="position"
          keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
        >
          <Logo resizeMode="contain" source={require("../assets/logo.png")} />
          {children}
        </KeyboardAvoidingView>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default AuthLayout;
