import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, XStack, YStack, Text } from "tamagui";

interface HistoryItemProps {
    exerciseImage: string;
    exerciseName: string;
    muscleGroup: string;
    time: string;
}

export function HistoryItem({
    exerciseImage,
    exerciseName,
    muscleGroup,
    time,
}: HistoryItemProps) {
    return (
        <XStack justify={"space-between"} paddingBlock={10}>
            <XStack gap={10}>
                <Image
                    src={exerciseImage}
                    style={{
                        width: 75,
                        height: 75,
                        borderRadius: 10,
                    }}
                />
                <YStack>
                    <Text fontWeight={800} fontSize={18}>
                        {exerciseName}
                    </Text>
                    <Text fontSize={14} color={"$color11"}>
                        {muscleGroup} - {time}
                    </Text>
                </YStack>
            </XStack>
            <YStack justify={"center"}>
                <Ionicons name="chevron-forward" size={18} color={"white"} />
            </YStack>
        </XStack>
    );
}
