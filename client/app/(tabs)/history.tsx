import { HistoryItem } from "@/components/history/history-item";
import Header from "@/components/layout/header";
import { HistoryItemData } from "@/types";
import React, { useEffect, useState } from "react";
import { FlatList as RNFlatList } from "react-native";
import { Input, styled, YStack } from "tamagui";

const FlatList = styled(RNFlatList, {
    name: "TamaguiFlatList",
    flex: 1,
    marginBlockEnd: "$13",
});

export default function History() {
    let [historyData, setHistoryData] = useState<HistoryItemData[]>([
        {
            exerciseImage: require("../../assets/images/exercises/lat_pulldown.png"),
            exerciseName: "Cable Lat Pulldown",
            muscleGroup: "Back",
            time: "8:42 AM",
        },
        {
            exerciseImage: require("../../assets/images/exercises/bench_press.png"),
            exerciseName: "Bench Press",
            muscleGroup: "Chest",
            time: "9:15 AM",
        },
        {
            exerciseImage: require("../../assets/images/exercises/seated_row.png"),
            exerciseName: "Seated Row",
            muscleGroup: "Back",
            time: "10:42 AM",
        },
        {
            exerciseImage: require("../../assets/images/exercises/hip_adduction.png"),
            exerciseName: "Hip Adduction",
            muscleGroup: "Legs",
            time: "11:30 AM",
        },
        {
            exerciseImage: require("../../assets/images/exercises/bicep_curl.png"),
            exerciseName: "Bicep Curl",
            muscleGroup: "Arms",
            time: "12:00 PM",
        },

        {
            exerciseImage: require("../../assets/images/exercises/squat.png"),
            exerciseName: "Squat",
            muscleGroup: "Legs",
            time: "2:30 PM",
        },
        {
            exerciseImage: require("../../assets/images/exercises/hip_abduction.png"),
            exerciseName: "Hip Abduction",
            muscleGroup: "Legs",
            time: "3:45 PM",
        },
        {
            exerciseImage: "https://placehold.co/75.jpg",
            exerciseName: "Plank",
            muscleGroup: "Core",
            time: "4:00 PM",
        },
        {
            exerciseImage: "https://placehold.co/75.jpg",
            exerciseName: "Push-ups",
            muscleGroup: "Chest",
            time: "5:15 PM",
        },
    ]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [historyList, setHistoryList] = useState(historyData);
    const searchHandler = (text: string) => {
        setHistoryList((prevData) =>
            prevData.filter((item) =>
                item.exerciseName.toLowerCase().includes(text.toLowerCase()),
            ),
        );
    };
    useEffect(() => {
        if (searchTerm === "") {
            setHistoryList(historyData);
        } else {
            searchHandler(searchTerm);
        }
    }, [historyData, searchTerm]);

    return (
        <YStack flex={1} bg="$accent12" gap={"$3"} paddingBlockStart={"$4"}>
            <Header
                title="History"
                onButtonPress={() => console.log("Settings pressed")}
            />
            <YStack flex={1} gap={"$3"} paddingInline={"$3"}>
                <Input
                    size="$4"
                    placeholder={"Search history..."}
                    placeholderTextColor={"$color10"}
                    borderWidth={"$1"}
                    onChange={(text) => setSearchTerm(text.target.value)}
                />

                <FlatList
                    data={historyList}
                    keyExtractor={(item) => {
                        const historyItem = item as (typeof historyData)[0];
                        return `${historyItem.exerciseName}-${historyItem.time}`;
                    }}
                    showsVerticalScrollIndicator={true}
                    renderItem={({ item }) => {
                        const historyItem = item as (typeof historyData)[0];
                        return (
                            <HistoryItem
                                exerciseImage={historyItem.exerciseImage}
                                exerciseName={historyItem.exerciseName}
                                muscleGroup={historyItem.muscleGroup}
                                time={historyItem.time}
                            />
                        );
                    }}
                />
            </YStack>
        </YStack>
    );
}
