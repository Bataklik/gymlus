import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/*
class Exercise(Base):
    """ Schema for an exercise. """
    __tablename__ = "exercises"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    equipment_tag: Mapped[str] = mapped_column(String, index=True)
    display_name: Mapped[str] = mapped_column(String, index=True)
    target_muscles: Mapped[list[str]] = mapped_column(Text, nullable=True)
    instructions: Mapped[list[str]] = mapped_column(Text, nullable=True)
    difficulty: Mapped[int] = mapped_column(Integer, nullable=True)
    equipment_type: Mapped[str] = mapped_column(String, nullable=True)
    force_type: Mapped[str] = mapped_column(String, nullable=True)
    suggested_sets_reps: Mapped[str] = mapped_column(String, nullable=True)
    suggested_rest_seconds: Mapped[int] = mapped_column(Integer, nullable=True)
    target_muscles: Mapped[list[dict[str, bool]]
                           ] = mapped_column(Text, nullable=True)
    mechanics: Mapped[str] = mapped_column(String, nullable=True)
*/

interface FavoriteItem {
    id: number;
    equipment_tag: string;
    display_name: string;
    instructions: string[];
    difficulty: number;
    equipment_type: string;
    force_type: string;
    suggested_sets_reps: string;
    suggested_rest_seconds: number;
    target_muscles: { [key: string]: boolean };
    mechanics: string;
}

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState: {
        items: [] as FavoriteItem[],
    },
    reducers: {
        addFavorite: (state, action: PayloadAction<FavoriteItem>) => {
            state.items.push(action.payload);
        },
        removeFavorite: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload,
            );
        },
    },
});

export const { getFavorites, addFavorite, removeFavorite } =
    favoritesSlice.actions;
export default favoritesSlice.reducer;
