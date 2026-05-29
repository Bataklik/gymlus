import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import { XStack } from "tamagui";

interface ButtonlusProps {
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    icon?: React.ReactNode;
}

export function Buttonlus({ onPress, style, icon }: ButtonlusProps) {
    return (
        <Pressable onPress={onPress}>
            <XStack
                borderTopLeftRadius={100}
                borderTopRightRadius={100}
                borderBottomLeftRadius={100}
                borderBottomRightRadius={100}
                borderWidth={1}
                borderColor="$color5"
                paddingBlock={5}
                paddingInline={5}
                bg={"$color4"}
                style={style}
            >
                {icon ? (
                    icon
                ) : (
                    <Ionicons name="heart" color={"white"} size={28} />
                )}
            </XStack>
        </Pressable>
    );
}
