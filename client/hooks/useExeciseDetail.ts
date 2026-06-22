import { Exercise, Muscle } from "@/types";

export const useExerciseDetail = () => {
    const parseJson = (data: string | string[]): Exercise => {
        const exerciseObj = typeof data === "string" ? JSON.parse(data) : data;
        if (!exerciseObj) {
            throw new Error(
                "Geen geldige exercise data meegegeven aan parseJson",
            );
        }

        const targetMusclesParsed =
            typeof exerciseObj.target_muscles === "string"
                ? JSON.parse(exerciseObj.target_muscles)
                : exerciseObj.target_muscles || [];

        const instructionsParsed =
            typeof exerciseObj.instructions === "string"
                ? JSON.parse(exerciseObj.instructions)
                : exerciseObj.instructions || [];

        return {
            id: exerciseObj.id,
            display_name: exerciseObj.display_name,
            equipment_tag: exerciseObj.equipment_tag,
            image_source: exerciseObj.image_source,
            instructions: instructionsParsed,
            mechanics: exerciseObj.mechanics,
            force_type: exerciseObj.force_type,
            equipment_type: exerciseObj.equipment_type,
            target_muscles: targetMusclesParsed.map((muscle: Muscle) => ({
                name: muscle.name,
                main: muscle.main,
            })),
            difficulty: exerciseObj.difficulty,
            suggested_sets_reps: exerciseObj.suggested_sets_reps,
            suggested_rest_seconds: exerciseObj.suggested_rest_seconds,
        };
    };
    return { parseJson };
};
