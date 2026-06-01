import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { XStack, Text, YStack } from "tamagui";
import { StyleSheet } from "react-native";
import { RoundButtonlus } from "../round-buttonlus";

interface HomeHeaderProps {
    title: string;
    onButtonPress?: () => void;
    iconName: React.ComponentProps<typeof Ionicons>["name"];
}

export default function Header({
    title,
    onButtonPress,
    iconName,
}: HomeHeaderProps) {
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
            {iconName && (
                <RoundButtonlus
                    onPress={onButtonPress}
                    icon={
                        <Ionicons name={iconName} color={"white"} size={28} />
                    }
                />
            )}
        </XStack>
    );
}

const stylesheet = StyleSheet.create({
    headerTitle: {
        color: "white",
        fontWeight: "bold",
        fontSize: 28,
        paddingLeft: 20,
        paddingTop: 5,
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
