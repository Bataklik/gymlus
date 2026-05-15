import React from "react";
import { XStack, Text, Button, Circle } from "tamagui";
import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ScanBotbar() {
    const insets = useSafeAreaInsets();

    return (
        <XStack
            position="absolute"
            style={stylesheet.headerContainer}
            b={insets.bottom}
            items={"center"}
            l="$4"
            r="$4"
            bg="rgba(20,22,26,0.86)"
            elevation={10}
            borderTopLeftRadius={15}
            borderTopRightRadius={15}
            borderBottomLeftRadius={15}
            borderBottomRightRadius={15}
            blockSize={100}
            justify={"space-between"}
        >
            <ScanBotButton
                icon="close"
                onPress={() => console.log("Gallery clicked")}
            />
            <ScanButton />
            <ScanBotButton
                icon="images"
                onPress={() => console.log("Gallery clicked")}
            />
        </XStack>
    );
}

const ScanBotButton = ({
    icon,
    onPress,
}: {
    icon: string;
    onPress: () => void;
}) => {
    return (
        <Pressable style={{ flex: 1, alignItems: "center" }} onPress={onPress}>
            <XStack
                borderTopLeftRadius={100}
                borderTopRightRadius={100}
                borderBottomLeftRadius={100}
                borderBottomRightRadius={100}
                borderColor="$color4"
                style={stylesheet.buttonContainer}
            >
                <Ionicons name={icon} color={"white"} size={28} />
            </XStack>
        </Pressable>
    );
};

function ScanButton() {
    return (
        <Pressable
            style={{ flex: 1, alignItems: "center" }}
            onPress={() => console.log("Scan clicked")}
        >
            <Circle
                size={52}
                bg="$accent9"
                elevation={4}
                shadowColor="$accent9"
                shadowOpacity={0.5}
                shadowRadius={12}
            >
                <Ionicons name="scan" size={26} color={"$accent12"} />
            </Circle>
        </Pressable>
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
        backgroundColor: "transparent",
    },
});
