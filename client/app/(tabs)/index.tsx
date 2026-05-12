import CardScan from "@/components/home/card-scan";
import Header from "@/components/layout/header";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { YStack, Text, XStack, Button } from "tamagui";

export default function Home() {
    return (
        <YStack
            flex={1}
            backgroundColor="$accent12"
            gap={20}
            paddingBlockStart={20}
        >
            {/* Header */}
            <Header />
            {/* Card scan */}
            <CardScan />
            {/* Card stats*/}
            <XStack></XStack>
        </YStack>
    );
}
