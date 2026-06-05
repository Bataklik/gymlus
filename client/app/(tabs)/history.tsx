import { HistoryItem } from "@/components/history/history-item";
import Header from "@/components/layout/header";
import apiService from "@/services/api-services";
import { HistoryItemData } from "@/types";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList as RNFlatList } from "react-native";
import { Input, styled, YStack } from "tamagui";

const FlatList = styled(RNFlatList, {
    name: "TamaguiFlatList",
    flex: 1,
    marginBlockEnd: "$13",
});

export default function History() {
    // const [searchTerm, setSearchTerm] = useState<string>("");
    const [historyList, setHistoryList] = useState<HistoryItemData[] | null>(
        null,
    );
    // https://reactnavigation.org/docs/use-focus-effect/
    useFocusEffect(
        useCallback(() => {
            async function fetchHistoryData() {
                try {
                    const response = await apiService.fetchHistory();
                    const data = response;
                    setHistoryList(data.history || []);
                } catch (error) {
                    console.error("Error fetching history data:", error);
                }
            }
            fetchHistoryData();
            return () => {
                console.log("Cleanup function called");
            };
        }, []),
    );

    const formatTimestamp = (timestamp: string): string => {
        const date = new Date(timestamp);
        return date.toUTCString().slice(5, -7); // Format as "MMM DD YYYY HH:MM:SS"
    };

    return (
        <YStack flex={1} bg="$accent12" gap={"$3"} paddingBlockStart={"$4"}>
            <Header
                title="History"
                iconName="settings"
                onButtonPress={() => console.log("Settings pressed")}
            />
            <YStack flex={1} gap={"$3"} paddingInline={"$3"}>
                <Input
                    size="$4"
                    placeholder={"Search history..."}
                    placeholderTextColor={"$color10"}
                    borderWidth={"$1"}
                    onChange={(text) => null}
                />

                <FlatList
                    data={historyList}
                    keyExtractor={(item) => {
                        const historyItem: HistoryItemData =
                            item as HistoryItemData;
                        return historyItem.id;
                    }}
                    showsVerticalScrollIndicator={true}
                    renderItem={({ item }) => {
                        const historyItem: HistoryItemData =
                            item as HistoryItemData;
                        return (
                            <HistoryItem
                                exerciseImage={
                                    historyItem.exercise.image_source
                                }
                                exerciseName={historyItem.exercise.display_name}
                                muscleGroup={
                                    historyItem.exercise.equipment_type
                                }
                                time={formatTimestamp(historyItem.timestamp)}
                            />
                        );
                    }}
                />
            </YStack>
        </YStack>
    );
}
