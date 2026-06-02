import { Exercise, Muscle } from "@/types";

export const useExerciseDetail = () => {
    const parseJson = (data: string | string[]): Exercise => {
        return {
            id: JSON.parse(data as string).id,
            display_name: JSON.parse(data as string).display_name,
            equipment_tag: JSON.parse(data as string).equipment_tag,
            image_source: JSON.parse(data as string).image_source,
            instructions: JSON.parse(data as string).instructions,
            mechanics: JSON.parse(data as string).mechanics,
            force_type: JSON.parse(data as string).force_type,
            equipment_type: JSON.parse(data as string).equipment_type,
            target_muscles: JSON.parse(data as string).target_muscles.map(
                (muscle: Muscle) => ({
                    name: muscle.name,
                    main: muscle.main,
                }),
            ),
            difficulty: JSON.parse(data as string).difficulty,
            suggested_sets_reps: JSON.parse(data as string).suggested_sets_reps,
            suggested_rest_seconds: JSON.parse(data as string)
                .suggested_rest_seconds,
        };
    };
    return { parseJson };
};
