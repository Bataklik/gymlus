import React, { useEffect } from "react";
import { YStack, Text, Button } from "tamagui";
import { CameraView } from "expo-camera";
import ScanHeader from "@/components/scan/scan-header";
import { useScanCamera } from "@/hooks/useScanCamera";
import ScanBotbar from "@/components/scan/scan-botbar";
// https://ra-6446.medium.com/send-an-image-to-your-backend-with-the-fetch-function-javascript-react-9134f9935eb
// https://dev.to/sjamescarter/uploading-images-in-react-3lmb
// https://www.youtube.com/watch?v=QluwtZZedek
export default function Scan() {
    const {
        cameraPermission,
        requestCameraPermission,
        isFlashOn,
        camera,
        takePicture,
        closeHandler,
        flashHandler,
        pickImage,
        requestMediaLibraryPermission,
    } = useScanCamera();

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
                bg="$accent12"
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
            bg="$accent12"
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
