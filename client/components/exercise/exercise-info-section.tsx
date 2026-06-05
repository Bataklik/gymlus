import { XStack, Text, Progress } from "tamagui";
import { ExerciseInfo } from "./exercise-info";

interface ExerciseInfoSectionProps {
    difficulty: number;
    sets_reps: string;
    rest: number;
}
export function ExerciseInfoSection({
    difficulty,
    sets_reps,
    rest,
}: ExerciseInfoSectionProps) {
    return (
        <XStack gap={10} p={10} width="100%" rounded="$4" mb={10}>
            <ExerciseInfo
                title="MOEILIJKHEID"
                content={
                    <Progress
                        mt={10}
                        value={difficulty}
                        theme="light"
                        size="$1"
                    >
                        <Progress.Indicator bg="$accent1" />
                    </Progress>
                }
            />
            <ExerciseInfo
                title="SETS * REPS"
                content={
                    <Text fontSize={18} fontWeight={600}>
                        {sets_reps}
                    </Text>
                }
            />
            <ExerciseInfo
                title="RUST"
                content={
                    <Text fontSize={18} fontWeight={600}>
                        {rest}s
                    </Text>
                }
            />
        </XStack>
    );
}
