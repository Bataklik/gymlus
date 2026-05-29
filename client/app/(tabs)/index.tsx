import CardScan from "@/components/home/card-scan";
import CardStats from "@/components/home/card-stats";
import RecentlyScanned from "@/components/home/recently-scanned";
import Header from "@/components/layout/header";
import React, { useState } from "react";
import { YStack } from "tamagui";
import { useSelector } from "react-redux";
import { RootState } from "../store";
export default function Home() {
    const [dayStreak, setDayStreak] = useState(4);
    const [scans, setScans] = useState(21);
    const [saved, setSaved] = useState(67);
    const favorites = useSelector((state: RootState) => state.favorites.items);
    return (
        <YStack flex={1} bg="$accent12" gap={20} paddingBlockStart={20}>
            {/* Header */}
            <Header title="Home" onButtonPress={() => console.log(favorites)} />
            <YStack gap={15} paddingInline={8}>
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
