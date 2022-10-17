import React, { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import {
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Top = styled.View`
  flex: 1;
  background-color: white;
`;

const Bottom = styled.View`
  flex: 1;
  background-color: white;
`;

const ImageContainer = styled.TouchableOpacity``;
const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 0px;
`;

const HeaderRightText = styled.Text`
  color: #0095f6;
  font-weight: 600;
  font-size: 16px;
`;
const SelectPhoto = ({ navigation }: any) => {
  const [ok, setOk] = useState(false);
  const [photos, setPhotos] = useState<any>([]);
  const [totalPhotos, setTotalPhotos] = useState<number>(0);
  const [photoLocal, setPhotoLocal] = useState("");
  const [chosenPhoto, setChosenPhoto] = useState("");
  const getPhotos = async () => {
    const { totalCount } = await MediaLibrary.getAssetsAsync();
    const { assets: photos } = await MediaLibrary.getAssetsAsync({
      first: totalCount,
    });
    setPhotos(photos);
    setChosenPhoto(photos[0]?.uri);
  };

  const getPermissions = async () => {
    const { accessPrivileges, canAskAgain } =
      await MediaLibrary.getPermissionsAsync();
    if (accessPrivileges === "none" && canAskAgain) {
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();
      if (accessPrivileges !== "none") {
        setOk(true);
        getPhotos();
      }
    } else if (accessPrivileges !== "none") {
      setOk(true);
      getPhotos();
    }
  };
  const HeaderRight = () => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("UploadForm", {
          uri: photoLocal,
        })
      }
    >
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );
  useEffect(() => {
    getPermissions();
  }, []);
  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, [chosenPhoto, photoLocal]);

  const numColumns = 4;
  const { width } = useWindowDimensions();
  const choosePhoto = async (id: any) => {
    const assetInfo: any = await MediaLibrary.getAssetInfoAsync(id);
    setPhotoLocal(assetInfo.localUri);
    setChosenPhoto(assetInfo.uri);
  };
  const renderItem = ({ item: photo }: any) => (
    <ImageContainer onPress={() => choosePhoto(photo.id)}>
      <Image
        source={{ uri: photo.uri }}
        style={{ width: width / numColumns, height: 100 }}
      />
      <IconContainer>
        {chosenPhoto === photo.uri ? (
          <Ionicons name="checkmark-circle" size={18} color="dodgerblue" />
        ) : null}
      </IconContainer>
    </ImageContainer>
  );
  return (
    <Container>
      <StatusBar hidden={false} />
      <Top>
        {chosenPhoto !== "" ? (
          <Image
            source={{ uri: chosenPhoto }}
            style={{ width, height: "100%" }}
          />
        ) : null}
      </Top>
      <Bottom>
        <FlatList
          data={photos}
          numColumns={numColumns}
          keyExtractor={(photo) => photo.id}
          renderItem={renderItem}
        />
      </Bottom>
    </Container>
  );
};

export default SelectPhoto;
