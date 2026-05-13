import CardScan from "@/components/home/card-scan";
import CardStats from "@/components/home/card-stats";
import Header from "@/components/layout/header";
import React, { useState } from "react";
import { YStack } from "tamagui";

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
            <YStack gap={10} paddingHorizontal={8}>
                {/* Card scan */}
                <CardScan />
                {/* Card stats*/}
                <CardStats dayStreak={dayStreak} scans={scans} saved={saved} />
            </YStack>
        </YStack>
    );
}
