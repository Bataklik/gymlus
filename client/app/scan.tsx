import React, { ComponentRef, useEffect, useRef, useState } from "react";
import { YStack, Text, Button } from "tamagui";
import {
    CameraView,
    CameraType,
    useCameraPermissions,
    FlashMode,
} from "expo-camera";
import ScanHeader from "@/components/scan/scan-header";
import { router } from "expo-router";
import * as MediaLibrary from "expo-media-library";
import ScanBotbar from "@/components/scan/scan-botbar";
export default function Scan() {
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    const [mediaPermission, requestMediaPermission] =
        MediaLibrary.usePermissions();
    const [facing, setFacing] = useState<CameraType>("back");
    const [isFlashOn, setIsFlashOn] = useState<boolean>(false);
        const camera = useRef<ComponentRef<typeof CameraView> | null>(null);
    const [image, setImage] = useState<string | null>(null);

    const takePicture = async () => {
        if (camera.current) {
            const options = {
                quality: 0.5,
                base64: true,
            };
            const photo = await camera.current?.takePictureAsync(options);
            if (!photo) return;
            setImage(photo.uri);
            console.log("Photo taken:", photo.uri);
        }
    const closeHandler = () => {
        router.back();
    };
    const flashHandler = () => {
        console.log("Flash toggled: " + isFlashOn);
        setIsFlashOn(!isFlashOn);
    };
    const facingHandler = () => {
        setFacing(facing === "back" ? "front" : "back");
    };
    const requestMediaLibraryPermission = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status === "granted") {
            console.log("Media library permission granted");
        } else {
            console.log("Media library permission denied");
        }
    };
    useEffect(() => {
        requestMediaLibraryPermission();
    }, []);

    if (!cameraPermission) {
        // Camera permissions are still loading.
        return <Text>No permission</Text>;
    }
    if (!cameraPermission.granted) {
        // Camera permissions are not granted yet.
        return (
            <YStack
                flex={1}
                backgroundColor="$accent12"
                paddingBlockStart={40}
                elevation={10}
                gap={20}
            >
                <ScanHeader closeHandler={closeHandler} />
                <Text>We need your permission to show the camera</Text>
                <Button onPress={requestCameraPermission}>
                    <Text>Grant Permission</Text>
                </Button>
            </YStack>
        );
    }

    return (
        <YStack
            flex={1}
            backgroundColor="$accent12"
            paddingBlockStart={40}
            elevation={10}
            gap={20}
        >
            <ScanHeader closeHandler={closeHandler} />
            <YStack flex={1}>
                <CameraView
                    ref={camera}
                    style={{ flex: 1, backgroundColor: "white" }}
                    facing={facing}
                    enableTorch={isFlashOn}
                />
            </YStack>
            <ScanBotbar
                facingHandler={facingHandler}
                flashHandler={flashHandler}
            />
        </YStack>
    );
}
