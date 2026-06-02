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

const FlatList = styled(RNFlatList, {
    name: "TamaguiFlatList",
    flex: 1,
    marginBlockEnd: "$13",
});

export default function Favorites() {
    const [favoritesList, setFavoritesList] = useState<Exercise[]>([]);
    const favorites = useSelector((state: RootState) => state.favorites.items);
    const dispatch = useDispatch();

    useEffect(() => {
        setFavoritesList(favorites);
    }, []);

    const handleRemoveFavorite = (item: Exercise) => {
        dispatch(removeFavorite(item.id));
        setFavoritesList((prevList) =>
            prevList.filter((fav) => fav.id !== item.id),
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
                    data={favoritesList}
                    keyExtractor={(item) => {
                        const favoriteItem = item as (typeof favoritesList)[0];
                        return `${favoriteItem.display_name}-${favoriteItem.difficulty}`;
                    }}
                    showsVerticalScrollIndicator={true}
                    renderItem={({ item }) => {
                        const favoriteItem = item as (typeof favoritesList)[0];
                        return (
                            <FavItem
                                display_name={favoriteItem.display_name}
                                difficulty={favoriteItem.difficulty}
                                equipment_type={favoriteItem.equipment_type}
                                image_source={favoriteItem.image_source}
                                onPress={() => {
                                    handleRemoveFavorite(favoriteItem);
                                }}
                            />
                        );
                    }}
                />
            </YStack>
        </YStack>
    );
}
