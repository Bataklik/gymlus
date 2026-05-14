import React, { useEffect } from "react";
import { XStack, YStack, Text, Button } from "tamagui";
import { Camera, useCameraPermission } from "react-native-vision-camera";
import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ScanHeader from "@/components/layout/scan-header";
import { Tabs, router } from "expo-router";

export default function Scan() {
    const { hasPermission, requestPermission } = useCameraPermission();
    const closeHandler = () => {
        router.back();
    };

    useEffect(() => {
        if (!hasPermission) requestPermission();
    }, [hasPermission, requestPermission]);
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
                flashHandler={() => console.log("Flash clicked")}
            />
            <YStack>
                <Camera style={{ flex: 1 }} isActive={false} device={"back"} />
            </YStack>
        </YStack>
    );
}
