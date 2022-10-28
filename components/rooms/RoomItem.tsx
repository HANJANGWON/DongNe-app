import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import styled from "styled-components/native";
import useMe from "../../hooks/useMe";

const RoomContainer = styled.TouchableOpacity`
  width: 100%;
  padding: 15px 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Column = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 20px;
`;
const Data = styled.View``;
const UnreadDot = styled.View`
  width: 10px;
  border-radius: 5px;
  height: 10px;
  background-color: #0095f6;
`;
const Username = styled.Text`
  font-weight: 600;
  font-size: 16px;
`;
const UnreadText = styled.Text`
  margin-top: 2px;
  font-weight: 500;
`;

const RoomItem = ({ users, unreadTotal, id }: any) => {
  const { data: meData } = useMe();
  const navigation: NativeStackNavigationProp<any> = useNavigation();
  const talkingTo = users.find(
    (user: any) => user.username !== meData?.me?.username
  );
  const goToRoom = () =>
    navigation.navigate("Room", {
      id,
      talkingTo,
    });
  return (
    <RoomContainer onPress={goToRoom}>
      <Column>
        <Avatar source={{ uri: talkingTo.avatar }} />
        <Data>
          <Username>{talkingTo.username}</Username>
          <UnreadText>
            {unreadTotal} unread {unreadTotal === 1 ? "message" : "messages"}
          </UnreadText>
        </Data>
      </Column>
      <Column>{unreadTotal !== 0 ? <UnreadDot /> : null}</Column>
    </RoomContainer>
  );
};

export default RoomItem;
