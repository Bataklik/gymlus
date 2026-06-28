import Header from "@/components/layout/header";
import { RootState } from "@/store";
import { Exercise } from "@/types";
import React, { useEffect, useState } from "react";
import { FlatList as RNFlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { YStack, styled } from "tamagui";
import { router } from "expo-router";
import { FavItem } from "@/components/favorite/fav-item";
import { removeFavorite } from "@/features/favorites/favoritesSlice";

const FlatList = styled(RNFlatList<Exercise>, {
    name: "TamaguiFlatList",
    flex: 1,
    marginBlockEnd: "$13",
});

export default function Favorites() {
    const [favoritesList, setFavoritesList] = useState<Set<Exercise>>(
        new Set(),
    );
    const favorites = useSelector((state: RootState) => state.favorites.items);
    const dispatch = useDispatch();

    useEffect(() => {
        setFavoritesList(new Set(favorites));
        console.log("Favorites updated:", favorites);
    }, [favorites]);

    const handleRemoveFavorite = (item: Exercise) => {
        dispatch(removeFavorite(item.id));
        setFavoritesList(
            (prevList) =>
                new Set([...prevList].filter((fav) => fav.id !== item.id)),
        );
    };

    return (
        <YStack flex={1} bg="$accent12" gap={"$3"} paddingBlockStart={"$4"}>
            <Header
                title="Favorites"
                onButtonPress={() => router.back()}
                iconName="close"
            />

            <YStack flex={1} gap={"$3"} paddingInline={"$3"}>
                <FlatList
                    data={Array.from(favoritesList)}
                    keyExtractor={(item) => `${item.id}-${item.display_name}`}
                    showsVerticalScrollIndicator={true}
                    renderItem={({ item }) => {
                        return (
                            <FavItem
                                display_name={item.display_name}
                                difficulty={item.difficulty}
                                equipment_type={item.equipment_type}
                                image_source={item.image_source}
                                onPress={() => {
                                    handleRemoveFavorite(item);
                                }}
                            />
                        );
                    }}
                />
            </YStack>
        </YStack>
    );
}
