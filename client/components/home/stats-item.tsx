import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { OpaqueColorValue } from "react-native/Libraries/StyleSheet/StyleSheet";
import { YStack, XStack, Text, GetThemeValueForKey } from "tamagui";

interface StatsItemProps {
    iconName: React.ComponentProps<typeof Ionicons>["name"];
    iconColor?: string | OpaqueColorValue | undefined;
    textColor?: OpaqueColorValue | GetThemeValueForKey<"color"> | undefined;
    value: number | string;
    label: string;
}

export default function StatsItem({
    iconName,
    iconColor,
    textColor,
    value,
    label,
}: StatsItemProps) {
    return (
        <YStack
            height={80}
            width={125}
            borderTopRightRadius={20}
            borderTopLeftRadius={20}
            borderBottomLeftRadius={20}
            borderBottomRightRadius={20}
            paddingStart={10}
            paddingEnd={10}
            paddingBlockStart={10}
            paddingBlockEnd={10}
            bg="$color3"
            paddingInline={20}
            justify={"center"}
        >
            <XStack justify={"flex-start"} items={"center"} gap={4}>
                <Ionicons name={iconName} size={20} color={iconColor} />
                <Text color={textColor} fontSize={18} fontWeight={700}>
                    {value}
                </Text>
            </XStack>
            <Text color="$color10" justify={"center"} fontSize={14}>
                {label}
            </Text>
        </YStack>
    );
}
