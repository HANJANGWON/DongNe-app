import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

interface ButtonProps {
  onPress: () => void;
  text: string;
  disalbed: boolean;
  loading?: any;
}

const Button = styled.TouchableOpacity`
  background-color: #0095f6;
  padding: 15px 10px;
  margin-top: 20px;
  border-radius: 3px;
  width: 100%;
  opacity: ${(props: any) => (props.disabled ? "0.5" : 1)};
`;
const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  text-align: center;
`;

const AuthButton = ({ onPress, disalbed, text, loading }: ButtonProps) => {
  return (
    <Button disabled={disalbed} onPress={onPress}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <ButtonText>{text}</ButtonText>
      )}
    </Button>
  );
};

export default AuthButton;
