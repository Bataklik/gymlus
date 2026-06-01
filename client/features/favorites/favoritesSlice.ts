import { FavoriteItem } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState: {
        items: [] as FavoriteItem[],
    },
    reducers: {
        addFavorite: (state, action: PayloadAction<FavoriteItem>) => {
            state.items.push(action.payload);
        },
        removeFavorite: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload,
            );
        },
    },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
