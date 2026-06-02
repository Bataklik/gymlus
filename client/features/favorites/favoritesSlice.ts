import { Exercise } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// https://dev.to/avinash_krishnan/add-to-cart-feature-in-react-with-redux-toolkit-24f7
export const favoritesSlice = createSlice({
    name: "favorites",
    initialState: {
        items: [] as Exercise[],
    },
    reducers: {
        addFavorite: (state, action: PayloadAction<Exercise>) => {
            const newFavorite = action.payload;
            state.items.push(newFavorite);
        },
        removeFavorite: (state, action: PayloadAction<string>) => {
            const toRemoveFavoriteId = action.payload;
            state.items = state.items.filter(
                (item) => item.id !== toRemoveFavoriteId,
            );
        },
    },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
