import { gql, useMutation } from "@apollo/client";
import { ReactNativeFile } from "apollo-upload-client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { FEED_POST } from "../fragments";

const UPLOAD_POST_MUTATION = gql`
  mutation uploadPost($file: Upload!, $caption: String!) {
    uploadPost(file: $file, caption: $caption) {
      ...FeedPost
    }
  }
  ${FEED_POST}
`;

const Container = styled.View`
  flex: 1;
  background-color: white;
  padding: 0px 50px;
`;
const Photo = styled.Image`
  height: 350px;
`;
const CaptionContainer = styled.View`
  margin-top: 30px;
`;
const Caption = styled.TextInput`
  padding: 10px 20px;
  border: 1px rgba(63, 64, 66, 0.909);
  border-radius: 100px;
`;
const HeaderRightText = styled.Text`
  color: #0095f6;
  font-weight: 600;
  font-size: 16px;
`;

const UploadForm = ({ route, navigation }: any) => {
  const updateUploadPhoto = (cache: any, result: any) => {
    const {
      data: { uploadPost },
    } = result;
    if (uploadPost.id) {
      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeFeed(prev: any) {
            return [uploadPost, ...prev];
          },
        },
      });
      navigation.navigate("Tabs");
    }
  };
  const [uploadPostMutation, { loading }] = useMutation(UPLOAD_POST_MUTATION, {
    update: updateUploadPhoto,
  });
  const HeaderRight = () => (
    <TouchableOpacity onPress={handleSubmit(onValid)}>
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );
  const HeaderRightLoading = () => (
    <ActivityIndicator size="small" color={"black"} />
  );
  const HeaderLeftNull = () => <Text></Text>;

  const { register, handleSubmit, setValue } = useForm();
  useEffect(() => {
    register("caption");
  }, [register]);
  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderRightLoading : HeaderRight,
      ...(loading && { headerLeft: HeaderLeftNull }),
    });
  }, [loading]);
  const onValid = ({ caption }: any) => {
    const file = new ReactNativeFile({
      uri: route.params.uri,
      name: `a.jpg`,
      type: "image/jpeg",
    });
    uploadPostMutation({
      variables: {
        caption,
        file,
      },
    });
  };
  return (
    <DismissKeyboard>
      <Container>
        <Photo resizeMode="contain" source={{ uri: route.params.uri }} />
        <CaptionContainer>
          <Caption
            returnKeyType="done"
            placeholder="Write a caption..."
            placeholderTextColor="gray"
            onSubmitEditing={handleSubmit(onValid)}
            onChangeText={(text: any) => setValue("caption", text)}
          />
        </CaptionContainer>
      </Container>
    </DismissKeyboard>
  );
};

export default UploadForm;
