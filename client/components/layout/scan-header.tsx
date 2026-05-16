import React from "react";
import { XStack, Text } from "tamagui";
import {
    Pressable,
    PressableStateCallbackType,
    StyleProp,
    StyleSheet,
    ViewStyle,
} from "react-native";
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
            <ScanButton
                onPressHandler={closeHandler}
                iconName="close"
                style={{
                    marginLeft: 10,
                }}
            />
            <XStack alignItems={"center"}>
                <Ionicons
                    name="scan"
                    color={"lightgray"}
                    size={16}
                    style={{ marginRight: 5 }}
                />
                <Text style={stylesheet.headerTitle}>Scan</Text>
            </XStack>
            <ScanButton
                onPressHandler={flashHandler}
                iconName="flash-outline"
                style={{
                    marginRight: 10,
                }}
            />
        </XStack>
    );
}

interface ScanButtonProps {
    onPressHandler?: () => void;
    iconName: React.ComponentProps<typeof Ionicons>["name"];
    style?:
        | StyleProp<ViewStyle>
        | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);
}
function ScanButton({ onPressHandler, iconName, style }: ScanButtonProps) {
    return (
        <Pressable style={style} onPress={onPressHandler}>
            <XStack
                borderTopLeftRadius={100}
                borderTopRightRadius={100}
                borderBottomLeftRadius={100}
                borderBottomRightRadius={100}
                borderColor="$color5"
                p={5}
                bg={"$color4"}
            >
                <Ionicons name={iconName} color={"white"} size={26} />
            </XStack>
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
});
