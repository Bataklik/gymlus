import Ionicons from "@expo/vector-icons/build/Ionicons";
import React from "react";
import { XStack, YStack, Text, Button } from "tamagui";
import { Image } from "expo-image";
import { getLocalExerciseImage } from "@/constants/Helper";

interface FavItemProps {
    display_name: string;
    difficulty: number;
    equipment_type: string;
    image_source: string;
    onPress: () => void;
}

export function FavItem({
    display_name,
    difficulty,
    equipment_type,
    image_source,
    onPress,
}: FavItemProps) {
    const calculateDifficulty = (difficulty: number) => {
        if (difficulty <= 40) return "Beginner";
        else if (difficulty >= 41 && difficulty <= 80) return "Intermediate";
        else return "Advanced";
    };
    return (
        <XStack justify={"space-between"} items={"center"} paddingBlock={10}>
            <XStack gap={10}>
                <FavImage image_source={image_source}></FavImage>
                <FavInfo
                    display_name={display_name}
                    difficulty={calculateDifficulty(difficulty)}
                    equipment_type={equipment_type}
                />
            </XStack>
            <FavButton onPress={onPress} />
        </XStack>
    );
}
interface FavImageProps {
    image_source: string;
}
function FavImage({ image_source }: FavImageProps) {
    return (
        <Image
            source={getLocalExerciseImage(image_source)}
            style={{
                width: 75,
                height: 75,
                borderRadius: 10,
            }}
        />
    );
}

interface FavInfoProps {
    display_name: string;
    difficulty: string;
    equipment_type: string;
}
function FavInfo({ display_name, difficulty, equipment_type }: FavInfoProps) {
    return (
        <YStack>
            <Text fontWeight={800} fontSize={18}>
                {display_name}
            </Text>
            <XStack gap={10} marginBlockStart={10}>
                <FavBadge
                    item={
                        <Text color={"$color11"} fontWeight={800}>
                            {difficulty}
                        </Text>
                    }
                />
                <FavBadge
                    item={
                        <Text color={"$color11"} fontWeight={800}>
                            {equipment_type.at(0)?.toUpperCase() +
                                equipment_type.slice(1)}
                        </Text>
                    }
                />
            </XStack>
        </YStack>
    );
}

interface FavBadgeProps {
    item: React.ReactNode;
}
function FavBadge({ item }: FavBadgeProps) {
    return (
        <XStack
            bg={"$color7"}
            borderTopEndRadius={5}
            borderBottomEndRadius={5}
            borderTopStartRadius={5}
            borderBottomStartRadius={5}
            paddingInline={"$4"}
            paddingBlock={"$1"}
        >
            {item}
        </XStack>
    );
}

interface FavButtonProps {
    onPress: () => void;
}
function FavButton({ onPress }: FavButtonProps) {
    return (
        <Button
            borderTopEndRadius={60}
            borderBottomEndRadius={60}
            borderTopStartRadius={60}
            borderBottomStartRadius={60}
            onPress={onPress}
            size={"$3.5"}
        >
            <Ionicons name="trash" size={18} color={"white"} />
        </Button>
    );
}
