import CardScan from "@/components/home/card-scan";
import CardStats from "@/components/home/card-stats";
import RecentlyScanned from "@/components/home/recently-scanned";
import Header from "@/components/layout/header";
import React, { useCallback, useEffect, useState } from "react";
import { YStack } from "tamagui";
import { router, useFocusEffect } from "expo-router";
import { useHistory } from "@/hooks/useHisotry";
import { HistoryItemData } from "@/types";
export default function Home() {
    const { fetchHistoryData } = useHistory();

    const [dayStreak, setDayStreak] = useState(4);
    const [scans, setScans] = useState(21);
    const [saved, setSaved] = useState(67);

    const [recentlyScanned, setRecentlyScanned] = useState<HistoryItemData[]>(
        [],
    );

    useFocusEffect(
        useCallback(() => {
            const loadRecentlyScanned = async () => {
                const data = await fetchHistoryData();
                setRecentlyScanned(data.filter((item) => item.exercise));
            };
            loadRecentlyScanned();
            return () => {
                setRecentlyScanned([]);
            };
        }, []),
    );
    return (
        <YStack flex={1} bg="$accent12" gap={20} paddingBlockStart={20}>
            {/* Header */}
            <Header
                title="Home"
                onButtonPress={() => router.push("/favorites")}
                iconName="heart"
            />
            <YStack gap={15} paddingInline={8}>
                {/* Card scan */}
                <CardScan />
                {/* Card stats*/}
                <CardStats dayStreak={dayStreak} scans={scans} saved={saved} />
                {/* Recently scanned */}
                <RecentlyScanned recentlyScanned={recentlyScanned} />
            </YStack>
        </YStack>
    );
}
