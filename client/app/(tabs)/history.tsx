import { HistoryItem } from "@/components/history/history-item";
import Header from "@/components/layout/header";
import { useHistory } from "@/hooks/useHisotry";
import apiService from "@/services/api-services";
import { HistoryItemData } from "@/types";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { FlatList as RNFlatList, TouchableOpacity } from "react-native";
import { Input, styled, YStack } from "tamagui";
import { router } from "expo-router";
import { useExerciseDetail } from "@/hooks/useExeciseDetail";
const FlatList = styled(RNFlatList, {
    name: "TamaguiFlatList",
    flex: 1,
    marginBlockEnd: "$13",
});

export default function History() {
    // const [searchTerm, setSearchTerm] = useState<string>("");
    const { fetchHistoryData } = useHistory();
    const { parseJson } = useExerciseDetail();

    const [historyList, setHistoryList] = useState<HistoryItemData[]>([]);
    // https://reactnavigation.org/docs/use-focus-effect/
    useFocusEffect(
        useCallback(() => {
            const loadHistory = async () => {
                const data = await fetchHistoryData();
                setHistoryList(data);
            };
            loadHistory();
            return () => {
                setHistoryList([]);
            };
        }, []),
    );

    const onHistoryItemPress = async (historyItemId: string) => {
        try {
            const historyItemDetails = await apiService
                .fetchHistoryItem(historyItemId)
                .then((data) => {
                    const exerciseData = data?.history?.exercise;
                    if (exerciseData) {
                        console.log("Exercise data from history item:");
                        console.log(exerciseData);
                        const parsedExercise = parseJson(exerciseData);
                        console.log("Parsed exercise:");
                        console.log(parsedExercise);
                        return parsedExercise;
                    }
                })
                .catch((error) => {
                    console.error(
                        "Error fetching history item details:",
                        error,
                    );
                    throw error;
                });

            console.log("historyItemDetails");
            console.log(historyItemDetails);
            router.push({
                pathname: "/exercise_detail",
                params: { data: JSON.stringify(historyItemDetails) },
            });
        } catch (error) {
            console.error("Error fetching history item details:", error);
        }
    };

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
                            <TouchableOpacity
                                onPress={() =>
                                    onHistoryItemPress(historyItem.id)
                                }
                            >
                                <HistoryItem
                                    exerciseImage={
                                        historyItem.exercise.image_source
                                    }
                                    exerciseName={
                                        historyItem.exercise.display_name
                                    }
                                    muscleGroup={
                                        historyItem.exercise.equipment_type
                                    }
                                    time={formatTimestamp(
                                        historyItem.timestamp,
                                    )}
                                />
                            </TouchableOpacity>
                        );
                    }}
                />
            </YStack>
        </YStack>
    );
}
