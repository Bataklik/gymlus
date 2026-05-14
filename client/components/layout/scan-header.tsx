import React from "react";
import { XStack, Text, Button } from "tamagui";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ScanHeaderProps {
    closeHandler?: () => void;
    flashHandler?: () => void;
}

export default function ScanHeader({
    closeHandler,
    flashHandler,
}: ScanHeaderProps) {
    return (
        <XStack
            style={stylesheet.headerContainer}
            elevation={10}
            blockSize={100}
            paddingBlockStart={40}
            justify={"space-between"}
        >
            <Button
                borderTopLeftRadius={100}
                borderTopRightRadius={100}
                borderBottomLeftRadius={100}
                borderBottomRightRadius={100}
                style={stylesheet.buttonContainer}
                onPress={closeHandler}
            >
                <Ionicons name="close" color={"white"} size={28} />
            </Button>
            <XStack alignItems={"center"}>
                <Ionicons
                    name="scan"
                    color={"lightgray"}
                    size={16}
                    style={{ marginRight: 5 }}
                />
                <Text style={stylesheet.headerTitle}>Scan</Text>
            </XStack>
            <Button
                borderTopLeftRadius={100}
                borderTopRightRadius={100}
                borderBottomLeftRadius={100}
                borderBottomRightRadius={100}
                style={stylesheet.buttonContainer}
                onPress={flashHandler}
            >
                <Ionicons name="flash-outline" color={"white"} size={26} />
            </Button>
        </XStack>
    );
}

const stylesheet = StyleSheet.create({
    headerTitle: {
        color: "white",
        fontWeight: "bold",
        fontSize: 26,
        paddingHorizontal: 20,
    },
    headerDate: {
        color: "lightgray",
        fontSize: 16,
        paddingHorizontal: 20,
    },
    headerContainer: {
        alignItems: "center",
        paddingVertical: 10,
    },
    buttonContainer: {
        marginRight: 10,
    },
});
