import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import Separator from "../components/Separator";
import UserRow from "../components/UserRow";
import { USER_FRAGMENT } from "../fragments";

const LIKES_QUERY = gql`
  query seePostLikes($id: Int!) {
    seePostLikes(id: $id) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

const Likes = ({ route }: any) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(LIKES_QUERY, {
    variables: {
      id: route?.params?.postId,
    },
    skip: !route?.params?.postId,
  });

  const renderUser = ({ item: user }: any) => <UserRow {...user} />;
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        ItemSeparatorComponent={() => <Separator />}
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={data?.seePostLikes}
        keyExtractor={(item) => "" + item.id}
        renderItem={renderUser}
        style={{ width: "100%" }}
      />
    </ScreenLayout>
  );
};

export default Likes;
