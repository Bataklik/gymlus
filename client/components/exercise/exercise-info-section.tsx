import { XStack, Text, Progress } from "tamagui";
import { ExerciseInfo } from "./exercise-info";

interface ExerciseInfoSectionProps {
    dicculty: number;
    sets: number;
    reps: number;
    rest: number;
}
export function ExerciseInfoSection({
    dicculty,
    sets,
    reps = 0,
    rest,
}: ExerciseInfoSectionProps) {
    return (
        <XStack gap={10} p={10} width="100%" rounded="$4" mb={10}>
            <ExerciseInfo
                title="DIFFICULTY"
                content={
                    <Progress mt={10} value={dicculty} size="$1">
                        <Progress.Indicator
                            backgroundColor="$color"
                            transition={[
                                "quicker",
                                {
                                    transform: {
                                        overshootClamping: true,
                                    },
                                },
                            ]}
                        />
                    </Progress>
                }
            />
            <ExerciseInfo
                title="SETS * REPS"
                content={
                    <Text fontSize={18} fontWeight={600}>
                        {sets} x {reps} - {reps + 4}
                    </Text>
                }
            />
            <ExerciseInfo
                title="REST"
                content={
                    <Text fontSize={18} fontWeight={600}>
                        {rest}s
                    </Text>
                }
            />
        </XStack>
    );
}
