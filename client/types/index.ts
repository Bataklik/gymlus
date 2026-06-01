export interface FavoriteItem {
    id: string;
    equipment_tag: string;
    image_source: string;
    display_name: string;
    instructions: string[];
    difficulty: number;
    equipment_type: string;
    force_type: string;
    suggested_sets_reps: string;
    suggested_rest_seconds: number;
    target_muscles: Muscle[];
    mechanics: string;
}

export interface HistoryItemData {
    exerciseImage: string;
    exerciseName: string;
    muscleGroup: string;
    time: string;
}

export interface Muscle {
    main: boolean;
    name: string;
}
