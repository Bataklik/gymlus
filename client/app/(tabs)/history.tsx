import { HistoryItem } from "@/components/history/history-item";
import Header from "@/components/layout/header";
import apiService from "@/services/api-services";
import { HistoryItemData } from "@/types";
import React, { useEffect, useState } from "react";
import { FlatList as RNFlatList } from "react-native";
import { getUniqueId } from "react-native-device-info";
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
    useEffect(() => {
        async function fetchHistoryData() {
            try {
                const response = await apiService.fetchHistory();
                console.log(response);
                const data = response;
                setHistoryList(data.history || []);
            } catch (error) {
                console.error("Error fetching history data:", error);
            }
        }
        fetchHistoryData();
    }, []);

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

                {/* <FlatList
                    data={historyList}
                    keyExtractor={(item) => {
                        const historyItem = item as (typeof HistoryItem)[0];
                        return `${historyItem.exerciseName}-${historyItem.time}`;
                    }}
                    showsVerticalScrollIndicator={true}
                    renderItem={({ item }) => {
                        const historyItem = item as (typeof historyList);
                        return (
                            <HistoryItem
                                exerciseImage={historyItem.exerciseImage}
                                exerciseName={historyItem.exerciseName}
                                muscleGroup={historyItem.muscleGroup}
                                time={historyItem.time}
                            />
                        );
                    }}
                /> */}
            </YStack>
        </YStack>
    );
}
