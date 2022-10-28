import { gql, useQuery } from "@apollo/client";
import React from "react";
import { FlatList } from "react-native";
import { ROOM_FRAGMENT } from "../fragments";
import styled from "styled-components/native";
import ScreenLayout from "../components/ScreenLayout";
import useMe from "../hooks/useMe";
import Separator from "../components/Separator";
import RoomItem from "../components/rooms/RoomItem";

const SEE_ROOMS_QUERY = gql`
  query seeRooms {
    seeRooms {
      ...RoomParts
    }
  }
  ${ROOM_FRAGMENT}
`;

const Rooms = () => {
  const { data, loading } = useQuery(SEE_ROOMS_QUERY);
  const renderItem = ({ item: room }: any) => <RoomItem {...room} />;
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        ItemSeparatorComponent={() => <Separator />}
        style={{ width: "100%" }}
        data={data?.seeRooms}
        keyExtractor={(room) => "" + room.id}
        renderItem={renderItem}
      />
    </ScreenLayout>
  );
};

export default Rooms;
