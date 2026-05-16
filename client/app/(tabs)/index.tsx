import CardScan from "@/components/home/card-scan";
import CardStats from "@/components/home/card-stats";
import RecentlyScanned from "@/components/home/recently-scanned";
import Header from "@/components/home/home-header";
import React, { useState } from "react";
import { XStack, YStack, Text, Image } from "tamagui";

export default function Home() {
    const [dayStreak, setDayStreak] = useState(4);
    const [scans, setScans] = useState(21);
    const [saved, setSaved] = useState(67);
    return (
        <YStack
            flex={1}
            backgroundColor="$accent12"
            gap={20}
            paddingBlockStart={20}
        >
            {/* Header */}
            <Header />
            <YStack gap={15} paddingHorizontal={8}>
                {/* Card scan */}
                <CardScan />
                {/* Card stats*/}
                <CardStats dayStreak={dayStreak} scans={scans} saved={saved} />
                {/* Recently scanned */}
                <RecentlyScanned />
            </YStack>
        </YStack>
    );
}
