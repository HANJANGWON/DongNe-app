import React from "react";
import { useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import { Comment } from "../generated/graphql";

interface PostProps {
  id: number;
  user: {
    avatar?: string;
    username: string;
    fullName: string;
  };
  caption: string;
  file: string;
  isLiked: boolean;
  likes: number;
  commentsNumber: number;
  comments: Comment[];
}

const Container = styled.View``;
const Header = styled.View``;
const UserAvatar = styled.Image``;
const Username = styled.Text``;
const File = styled.Image``;
const Actions = styled.View``;
const Action = styled.TouchableOpacity``;
const Caption = styled.View``;
const CaptionText = styled.Text``;
const Likes = styled.Text``;

const Post = ({ id, user, caption, file, isLiked, likes }: PostProps) => {
  const { width, height } = useWindowDimensions();
  return (
    <Container>
      <Header>
        <UserAvatar />
        <Username>{user.username}</Username>
      </Header>
      <Caption>
        <CaptionText>{caption}</CaptionText>
      </Caption>
      <File
        style={{
          width,
          height: height - 500,
        }}
        source={{ uri: file }}
      />
      <Actions>
        <Action />
        <Action />
      </Actions>
      <Likes>{`좋아요 ${likes}개`}</Likes>
    </Container>
  );
};

export default Post;
