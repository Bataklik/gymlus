import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { XStack, Text, YStack } from "tamagui";
import { Pressable, StyleSheet } from "react-native";

export default function HomeHeader() {
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
            <YStack>
                <Text style={stylesheet.headerDate}>
                    {dayName} - {dayMonth} {dayDate}
                </Text>
                <Text style={stylesheet.headerTitle}>Gymlus</Text>
            </YStack>
            <SettingsButton onPress={() => console.log("Settings pressed")} />
        </XStack>
    );
}

interface SettingsButtonProps {
    onPress?: () => void;
}
function SettingsButton({ onPress }: SettingsButtonProps) {
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
                <Ionicons name="cog-outline" color={"white"} size={28} />
            </XStack>
        </Pressable>
    );
}

const stylesheet = StyleSheet.create({
    headerTitle: {
        color: "white",
        fontWeight: "bold",
        fontSize: 28,
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
        marginRight: 20,
    },
});
