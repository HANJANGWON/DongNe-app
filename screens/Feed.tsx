import { gql, useQuery } from "@apollo/client";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { logUserOut } from "../apollo";
import Post from "../components/Post";
import ScreenLayout from "../components/ScreenLayout";
import { COMMENT_FRAGMENT, POST_FRAGMENT } from "../fragments";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      ...PostFragment
      user {
        username
        fullName
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${POST_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

const Feed = () => {
  const { data, loading } = useQuery(FEED_QUERY);
  const renderPost = ({ item: post }: any) => {
    return <Post {...post} />;
  };
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeFeed}
        keyExtractor={(post) => "" + post.id}
        renderItem={renderPost}
      />
    </ScreenLayout>
  );
};

export default Feed;
