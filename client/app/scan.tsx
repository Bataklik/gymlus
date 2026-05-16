import React, { useEffect, useRef, useState } from "react";
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
    const [isFlashOn, setIsFlashOn] = useState<FlashMode>("off");
    const camera = useRef(null);

    const closeHandler = () => {
        router.back();
    };
    const flashHandler = () => {
        setIsFlashOn(isFlashOn === "off" ? "on" : "off");
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
            <ScanHeader
                closeHandler={closeHandler}
                flashHandler={flashHandler}
            />
            <YStack flex={1}>
                <CameraView
                    ref={camera}
                    style={{ flex: 1, backgroundColor: "white" }}
                    facing={facing}
                    flash={isFlashOn}
                />
            </YStack>
            <ScanBotbar
                facingHandler={facingHandler}
                flashHandler={flashHandler}
            />
        </YStack>
    );
}
