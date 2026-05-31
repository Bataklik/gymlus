export interface FavoriteItem {
    id: string;
    equipment_tag: string;
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

export interface Muscle {
    main: boolean;
    name: string;
}
