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
    icon: React.ComponentProps<typeof Ionicons>["name"];
    title: string;
    closeHandler?: () => void;
}

export default function ScanHeader({
    closeHandler,
    icon,
    title,
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
            <ScanHeaderTitle title={title} icon={icon} />
            <XStack p={5} />
        </XStack>
    );
}

interface ScanHeaderTitleProps {
    title?: string;
    icon?: React.ComponentProps<typeof Ionicons>["name"];
}
function ScanHeaderTitle({ title, icon }: ScanHeaderTitleProps) {
    return (
        <XStack items={"center"}>
            <Ionicons
                name={icon || "scan"}
                color={"lightgray"}
                size={24}
                style={{
                    marginRight: 5,
                }}
            />
            <Text style={stylesheet.headerTitle}>{title || "Scan"}</Text>
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
