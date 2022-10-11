import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { POST_FRAGMENT } from "../fragments";
import Post from "../components/Post";
import ScreenLayout from "../components/ScreenLayout";

const SEE_POST = gql`
  query seePost($id: Int!) {
    seePost(id: $id) {
      ...PostFragment
      user {
        id
        username
        fullName
        avatar
      }
      caption
    }
  }
  ${POST_FRAGMENT}
`;

const Photo = ({ route }: any) => {
  const { data, loading, refetch } = useQuery(SEE_POST, {
    variables: {
      id: route?.params?.postId,
    },
  });
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <ScreenLayout loading={loading}>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Post {...data?.seePost} />
      </ScrollView>
    </ScreenLayout>
  );
};

export default Photo;
