import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import { Comment } from "../generated/graphql";
import { Ionicons } from "@expo/vector-icons";
import { gql, useMutation } from "@apollo/client";

export type StackNavFactoryParamList = {
  Feed: undefined;
  Search: undefined;
  Notifications: undefined;
  Me: undefined;
  Profile: undefined;
  Photo: undefined;
  Likes: undefined | object;
  Comments: undefined;
};

interface PostProps {
  id: number;
  user: {
    id: number;
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

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const Container = styled.View``;
const Header = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;
const UserAvatar = styled.Image`
  margin-right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
`;
const Username = styled.Text`
  font-weight: 600;
`;
const File = styled.Image``;
const Actions = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Action = styled.TouchableOpacity`
  margin-right: 10px;
`;
const Caption = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;
const CaptionText = styled.Text`
  margin-left: 10px;
`;
const Likes = styled.Text`
  margin: 7px 0px;
  font-weight: 600;
`;

const ExtraContainer = styled.View`
  padding: 10px;
`;

const Post = ({
  id,
  user,
  caption,
  file,
  isLiked,
  likes,
  comments,
}: PostProps) => {
  const navigation: NativeStackNavigationProp<any> = useNavigation();
  const { width, height } = useWindowDimensions();
  const [imageHeight, setImageHeight] = useState(height - 450);
  useEffect(() => {
    Image.getSize(file, (width, height) => {
      setImageHeight(height / 2);
    });
  }, [file]);
  const updateToggleLike = (cache: any, result: any) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;
    if (ok) {
      const postId = `Post:${id}`;
      cache.modify({
        id: postId,
        fields: {
          isLiked(prev: any) {
            return !prev;
          },
          likes(prev: any) {
            if (isLiked) {
              return prev - 1;
            }
            return prev + 1;
          },
        },
      });
    }
  };
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    },
    update: updateToggleLike,
  });
  const goToProfile = () => {
    navigation.navigate("Profile", {
      username: user.username,
      id: user.id,
    });
  };
  return (
    <Container>
      <Header onPress={goToProfile}>
        <UserAvatar resizeMode="cover" source={{ uri: user.avatar }} />
        <Username>{user.username}</Username>
      </Header>
      <Caption>
        <CaptionText>{caption}</CaptionText>
      </Caption>
      <File
        resizeMode="cover"
        style={{
          width,
          height: 450,
        }}
        source={{ uri: file }}
      />
      <ExtraContainer>
        <Actions>
          <Action onPress={toggleLikeMutation}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              color={isLiked ? "tomato" : "black"}
              size={22}
            />
          </Action>
          <Action
            onPress={() =>
              navigation.navigate("Comments", {
                postId: id,
              })
            }
          >
            <Ionicons name="chatbubble-outline" size={22} />
          </Action>
        </Actions>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Likes", {
              postId: id,
            })
          }
        >
          <Likes>{`좋아요 ${likes}개`}</Likes>
        </TouchableOpacity>
      </ExtraContainer>
    </Container>
  );
};

export default Post;
