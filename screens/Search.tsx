import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";

const SEARCH_POSTS = gql`
  query searchPosts($keyword: String!) {
    searchPosts(keyword: $keyword) {
      id
      file
    }
  }
`;

const MessageContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const MessageText = styled.Text`
  margin-top: 10px;
  font-weight: 600;
`;

const Input = styled.TextInput`
  background-color: rgba(228, 232, 243, 0.909);
  width: ${(props: any) => props.width / 1.5}px;
  margin-bottom: 5px;
  padding: 5px 10px;
  border-radius: 7px;
`;
const Search = ({ navigation }: any) => {
  const numColumns = 3;
  const { width } = useWindowDimensions();
  const { setValue, register, watch, handleSubmit, getValues } = useForm();
  const [startQueryFn, { loading, data, called }] = useLazyQuery(SEARCH_POSTS);
  const onVaild = ({ keyword }: any) => {
    startQueryFn({
      variables: {
        keyword,
      },
    });
  };

  const SearchBox = () => (
    <Input
      width={width}
      placeholderTextColor="gray"
      placeholder="Search posts"
      autoCapitalize="none"
      returnKeyType="search"
      autoCorrect={false}
      onChangeText={(text: any) => setValue("keyword", text)}
      onSubmitEditing={handleSubmit(onVaild)}
    />
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register("keyword", {
      required: true,
      minLength: 2,
    });
  }, []);
  const renderItem = ({ item: post }: any) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Photo", {
          postId: post.id,
        })
      }
    >
      <Image
        source={{ uri: post.file }}
        style={{ width: width / numColumns, height: 150 }}
      />
    </TouchableOpacity>
  );
  return (
    <DismissKeyboard>
      <View style={{ flex: 1 }}>
        {loading ? (
          <MessageContainer>
            <ActivityIndicator size="large" />
            <MessageText>검색중...</MessageText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <MessageText>키워드를 검색해주세요.</MessageText>
          </MessageContainer>
        ) : null}
        {data?.searchPosts !== undefined ? (
          data?.searchPosts?.length === 0 ? (
            <MessageContainer>
              <MessageText>"{getValues("keyword")}" 검색 결과 없음</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              numColumns={numColumns}
              data={data?.searchPosts}
              keyExtractor={(post) => "" + post.id}
              renderItem={renderItem}
            />
          )
        ) : null}
      </View>
    </DismissKeyboard>
  );
};

export default Search;
