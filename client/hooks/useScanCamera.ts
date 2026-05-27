import { ComponentRef, useRef, useState } from "react";
import { Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import apiService from "@/services/api-services";
// https://docs.expo.dev/guides/environment-variables/
// https://stackoverflow.com/questions/71176314/file-upload-using-fastapi-returns-error-422
export function useScanCamera() {
    const camera = useRef<ComponentRef<typeof CameraView> | null>(null);
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    const [mediaPermission, requestMediaPermission] =
        MediaLibrary.usePermissions();
    const [isFlashOn, setIsFlashOn] = useState<boolean>(false);
    const [image, setImage] = useState<string | null>(null);

    const takePicture = async () => {
        console.log("Scan clicked");
        if (camera.current) {
            const options = {
                quality: 0.5,
                base64: true,
            };
            const photo = await camera.current?.takePictureAsync(options);
            if (!photo) return;
            setImage(photo.uri);
            await apiService.fetchExercise({ image: photo.uri });
            console.log("Photo taken:", photo.uri);

            try {
                if (mediaPermission?.granted) {
                    await MediaLibrary.saveToLibraryAsync(photo.uri);
                    console.log(
                        "Photo successfully saved to Media Library! 🎉",
                    );
                } else {
                    console.log(
                        "Media library permission not granted, photo only kept in cache.",
                    );
                }
            } catch (error) {
                console.error("Error saving photo to library:", error);
            }
        }
    };

    const closeHandler = () => {
        router.back();
    };
    const flashHandler = () => {
        console.log("Flash toggled: " + isFlashOn);
        setIsFlashOn(!isFlashOn);
    };

    const pickImage = async () => {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert(
                "Permission required",
                "Permission to access the media library is required.",
            );
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            quality: 0.5,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            await apiService
                .fetchExercise({ image: result.assets[0].uri })
                .then((data) => {
                    router.push({
                        pathname: "/exercise_detail",
                        params: { data: JSON.stringify(data) },
                    });
                })
                .catch((error) => {
                    Alert.alert(
                        "Error",
                        "An error occurred while fetching exercise data. Please try again.",
                    );
                    console.error("Error fetching exercise data:", error);
                });
        }
    };
    const requestMediaLibraryPermission = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status === "granted") {
            console.log("Media library permission granted");
        } else {
            console.log("Media library permission denied");
        }
    };
    return {
        cameraPermission,
        requestCameraPermission,
        isFlashOn,
        camera,
        takePicture,
        closeHandler,
        flashHandler,
        pickImage,
        requestMediaLibraryPermission,
    };
}
