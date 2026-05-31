import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { XStack, Text, YStack } from "tamagui";
import { Pressable, StyleSheet } from "react-native";
import { RoundButtonlus } from "../round-buttonlus";

interface HomeHeaderProps {
    title: string;
    onButtonPress?: () => void;
}

export default function Header({ title, onButtonPress }: HomeHeaderProps) {
    // Source - https://stackoverflow.com/a/24998705
    // Posted by Joeytje50
    // Retrieved 2026-05-12, License - CC BY-SA 3.0

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    let months = [
        "JANUARI",
        "FEBUARI",
        "MARCH",
        "APRIL",
        "MAY",
        "JUNE",
        "JULY",
        "AUGUST",
        "SEPTEMBER",
        "OCTOBER",
        "NOVEMBER",
        "DECEMBER",
    ];
    let d = new Date(Date.now());
    let dayName = days[d.getDay()];
    let dayDate = d.getDate();
    let dayMonth = months[d.getMonth()];

    return (
        <XStack
            style={stylesheet.headerContainer}
            elevation={10}
            blockSize={100}
            paddingBlockStart={40}
            justify={"space-between"}
        >
            <YStack gap={5}>
                <Text style={stylesheet.headerDate}>
                    {dayName} - {dayMonth} {dayDate}
                </Text>
                <XStack items={"center"} width={"100%"}>
                    <Text style={stylesheet.headerTitle}>{title}</Text>
                </XStack>
            </YStack>
            <RoundButtonlus
                onPress={onButtonPress}
                icon={<Ionicons name="heart" color={"white"} size={28} />}
            />
        </XStack>
    );
}

interface FavoriteButtonProps {
    onPress?: () => void;
}
function FavoriteButton({ onPress }: FavoriteButtonProps) {
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
                style={stylesheet.buttonContainer}
            >
                <Ionicons name="heart" color={"white"} size={28} />
            </XStack>
        </Pressable>
    );
}

const stylesheet = StyleSheet.create({
    headerTitle: {
        color: "white",
        fontWeight: "bold",
        fontSize: 28,
        paddingLeft: 20,
    },

    headerDate: {
        color: "lightgray",
        fontSize: 16,
        paddingLeft: 20,
    },
    headerContainer: {
        alignItems: "center",
        paddingVertical: 10,
    },
    buttonContainer: {
        marginRight: 20,
    },
});
