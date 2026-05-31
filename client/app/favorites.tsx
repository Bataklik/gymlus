import Header from "@/components/layout/header";
import { RootState } from "@/store";
import { FavoriteItem } from "@/types";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import React, { useEffect, useState } from "react";
import { FlatList as RNFlatList } from "react-native";
import { useSelector } from "react-redux";
import { Image, XStack, YStack, Text, styled } from "tamagui";

const FlatList = styled(RNFlatList, {
    name: "TamaguiFlatList",
    flex: 1,
    marginBlockEnd: "$13",
});

export default function Favorites() {
    const [favoritesList, setFavoritesList] = useState<FavoriteItem[]>([]);
    const favorites = useSelector((state: RootState) => state.favorites.items);

    useEffect(() => {
        setFavoritesList(favorites);
    }, []);

    return (
        <YStack flex={1} bg="$accent12" gap={"$3"} paddingBlockStart={"$4"}>
            <Header
                title="Favorites"
                onButtonPress={() => console.log("Settings pressed")}
            />
            <YStack flex={1} gap={"$3"} paddingInline={"$3"}>
                <FlatList
                    data={favoritesList}
                    keyExtractor={(item) => {
                        const favoriteItem = item as (typeof favoritesList)[0];
                        return `${favoriteItem.display_name}-${favoriteItem.difficulty}`;
                    }}
                    showsVerticalScrollIndicator={true}
                    renderItem={({ item }) => {
                        const favoriteItem = item as (typeof favoritesList)[0];
                        return (
                            <XStack justify={"space-between"} paddingBlock={10}>
                                <XStack gap={10}>
                                    <Image
                                        src={require("../assets/images/exercises/bench_press.png")}
                                        style={{
                                            width: 75,
                                            height: 75,
                                            borderRadius: 10,
                                        }}
                                    />
                                    <YStack>
                                        <Text fontWeight={800} fontSize={18}>
                                            {favoriteItem.display_name}
                                        </Text>
                                        <Text fontSize={14} color={"$color11"}>
                                            {favoriteItem.difficulty} -{" "}
                                            {favoriteItem.equipment_type}
                                        </Text>
                                    </YStack>
                                </XStack>
                                <YStack justify={"center"}>
                                    <Ionicons
                                        name="chevron-forward"
                                        size={18}
                                        color={"white"}
                                    />
                                </YStack>
                            </XStack>
                        );
                    }}
                />
            </YStack>
        </YStack>
    );
}
