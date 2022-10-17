import { Camera } from "expo-camera";
import { CameraType, FlashMode } from "expo-camera/build/Camera.types";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Image, Text, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import styled from "styled-components/native";
import { StatusBar } from "expo-status-bar";
import * as MediaLibrary from "expo-media-library";
import { useIsFocused } from "@react-navigation/native";

const Container = styled.View`
  background-color: black;
  flex: 1;
`;

const Actions = styled.View`
  flex: 0.35;
  padding: 0px 50px;
  align-items: center;
  justify-content: space-around;
`;
const ButtonsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TakePhotoBtn = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 50px;
`;

const SliderContainer = styled.View``;
const ActionsContainer = styled.View`
  flex-direction: row;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const PhotoActions = styled(Actions)`
  flex-direction: row;
`;

const PhotoAction = styled.TouchableOpacity`
  background-color: white;
  padding: 10px 25px;
  border-radius: 4px;
`;
const PhotoActionText = styled.Text`
  font-weight: 600;
`;

const TakePhoto = ({ navigation }: any) => {
  const cameraRef = useRef<Camera | null>();
  const [takenPhoto, setTakenPhoto] = useState("");
  const [cameraReady, setCameraReady] = useState(false);
  const [ok, setOk] = useState(false);
  const [flashMode, setFlashMode] = useState<FlashMode>(FlashMode.off);
  const [zoom, setZoom] = useState(0);
  const [cameraType, setCameraType] = useState<CameraType>(CameraType.back);
  const getPermissions = async () => {
    const { granted } = await Camera.requestCameraPermissionsAsync();
    setOk(granted);
  };

  useEffect(() => {
    getPermissions();
  }, []);
  const onCameraSwitch = () => {
    if (cameraType === CameraType.front) {
      setCameraType(CameraType.back);
    } else {
      setCameraType(CameraType.front);
    }
  };
  const onZoomValueChange = (e: any) => {
    setZoom(e);
  };
  const onFlashChange = () => {
    if (flashMode === FlashMode.off) {
      setFlashMode(FlashMode.on);
    } else if (flashMode === FlashMode.on) {
      setFlashMode(FlashMode.off);
    }
  };
  const goToUpload = async (save: any) => {
    if (save) {
      await MediaLibrary.saveToLibraryAsync(takenPhoto);
    }
    navigation.navigate("UploadForm", {
      uri: takenPhoto,
    });
  };
  const onUpload = () => {
    Alert.alert("Save photo?", "Save photo & upload or just upload", [
      {
        text: "저장 후 업로드",
        onPress: () => goToUpload(true),
      },
      {
        text: "업로드",
        onPress: () => goToUpload(false),
      },
    ]);
  };
  const onCameraReady = () => setCameraReady(true);
  const takePhoto = async () => {
    // 카메라의 존재여부를 확인하는 코드
    if (cameraRef.current && cameraReady) {
      const { uri } = await cameraRef.current.takePictureAsync({
        quality: 1,
        exif: true,
      });
      setTakenPhoto(uri);
    }
  };
  const onDismiss = () => setTakenPhoto("");
  const isFocused = useIsFocused();
  return (
    <Container>
      {isFocused ? <StatusBar hidden={true} /> : null}
      {takenPhoto === "" ? (
        <Camera
          type={cameraType}
          style={{ flex: 1 }}
          zoom={zoom}
          flashMode={flashMode}
          ref={(camera) => {
            cameraRef.current = camera;
          }}
          onCameraReady={onCameraReady}
        >
          <CloseButton onPress={() => navigation.navigate("Tabs")}>
            <Ionicons name="close" color="white" size={30} />
          </CloseButton>
        </Camera>
      ) : (
        <Image source={{ uri: takenPhoto }} style={{ flex: 1 }} />
      )}
      {takenPhoto === "" ? (
        <Actions>
          <SliderContainer>
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="rgba(255, 255, 255, 0.5)"
              onValueChange={onZoomValueChange}
            />
          </SliderContainer>
          <ButtonsContainer>
            <TakePhotoBtn onPress={takePhoto} />
            <ActionsContainer>
              <TouchableOpacity
                onPress={onFlashChange}
                style={{ marginRight: 30 }}
              >
                <Ionicons
                  size={40}
                  color="white"
                  name={flashMode === FlashMode.on ? "flash-off" : "flash"}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={onCameraSwitch}>
                <Ionicons size={40} color="white" name={"camera-reverse"} />
              </TouchableOpacity>
            </ActionsContainer>
          </ButtonsContainer>
        </Actions>
      ) : (
        <PhotoActions>
          <PhotoAction onPress={onDismiss}>
            <PhotoActionText>취소</PhotoActionText>
          </PhotoAction>
          <PhotoAction onPress={onUpload}>
            <PhotoActionText>업로드</PhotoActionText>
          </PhotoAction>
        </PhotoActions>
      )}
    </Container>
  );
};

export default TakePhoto;
