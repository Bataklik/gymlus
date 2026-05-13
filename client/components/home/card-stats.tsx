import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { XStack, YStack, Text } from "tamagui";

export default function CardStats() {
    return (
        <XStack gap={20} justify={"space-between"}>
            <YStack
                height={80}
                width={120}
                borderTopRightRadius={20}
                borderTopLeftRadius={20}
                borderBottomLeftRadius={20}
                borderBottomRightRadius={20}
                paddingStart={10}
                paddingEnd={10}
                paddingBlockStart={10}
                paddingBlockEnd={10}
                backgroundColor="$color3"
                paddingStart={20}
                justify={"center"}
            >
                <XStack justify={"flex-start"} gap={2}>
                    <Ionicons name="flame-outline" size={22} color="orange" />
                    <Text color="orange" fontSize={18} fontWeight={700}>
                        12
                    </Text>
                </XStack>
                <Text color="$color10" justify={"center"} fontSize={14}>
                    Day streak
                </Text>
            </YStack>
        </XStack>
    );
}
