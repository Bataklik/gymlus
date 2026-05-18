import React, { useEffect } from "react";
import { YStack, Text, Button } from "tamagui";
import { CameraView } from "expo-camera";
import ScanHeader from "@/components/scan/scan-header";
import { useScanCamera } from "@/hooks/useScanCamera";
import ScanBotbar from "@/components/scan/scan-botbar";
import { router } from "expo-router";

export default function Scan() {
    const {
        cameraPermission,
        requestCameraPermission,
        isFlashOn,
        camera,
        image,
        setImage,
        takePicture,
        closeHandler,
        flashHandler,
        pickImage,
        requestMediaLibraryPermission,
    } = useScanCamera();
    useEffect(() => {
        requestMediaLibraryPermission();
    }, []);

    useEffect(() => {
        if (!image) return;
        router.push({ pathname: "/exercise", params: { image } });
        setImage(null);
    }, [image, setImage]);

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
                <ScanHeader
                    title="Scan"
                    icon="camera"
                    closeHandler={closeHandler}
                />
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
                title="Scan"
                icon="camera"
                closeHandler={closeHandler}
            />
            <YStack flex={1}>
                <CameraView
                    ref={camera}
                    style={{ flex: 1, backgroundColor: "white" }}
                    facing={"back"}
                    enableTorch={isFlashOn}
                />
            </YStack>
            <ScanBotbar
                pickImageHandler={pickImage}
                flashHandler={flashHandler}
                cameraHandler={takePicture}
            />
        </YStack>
    );
}
