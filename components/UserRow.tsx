import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import styled from "styled-components/native";

type UserItemNavigationProps = NativeStackNavigationProp<any>;

const Column = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;
const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 25px;
  margin-right: 10px;
`;
const Username = styled.Text`
  font-weight: 600;
`;

const Wrapper = styled.View`
  padding: 5px 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const FollowBtn = styled.TouchableOpacity`
  background-color: #0095f6;
  justify-content: center;
  padding: 5px 10px;
  border-radius: 4px;
`;
const FollowBtnText = styled.Text`
  color: white;
  font-weight: 600;
`;

const UserRow = ({ avatar, id, username, isFollowing, isMe }: any) => {
  const navigation = useNavigation<UserItemNavigationProps>();
  return (
    <Wrapper>
      <Column
        onPress={() =>
          navigation.navigate("Profile", {
            username,
            id,
          })
        }
      >
        <Avatar source={{ uri: avatar }} />
        <Username>{username}</Username>
      </Column>
      {!isMe ? (
        <FollowBtn>
          <FollowBtnText>{isFollowing ? "Unfollow" : "follow"}</FollowBtnText>
        </FollowBtn>
      ) : null}
    </Wrapper>
  );
};

export default UserRow;
