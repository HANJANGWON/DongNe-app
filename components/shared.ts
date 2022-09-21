import styled from "styled-components/native";

interface InputProps {
  lastOne?: boolean;
}

export const Input = styled.TextInput<InputProps>`
  background-color: rgba(228, 232, 243, 0.909);
  padding: 15px 7px;
  border-radius: 4px;
  margin-bottom: ${(props) => (props.lastOne ? "15" : 8)}px;
`;
