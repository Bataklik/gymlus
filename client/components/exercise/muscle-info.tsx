import { YStack, XStack, Text } from "tamagui";
import { MuscleItem } from "./muscle-item";
import { Muscle } from "@/types";

interface MuscleInfoProps {
    muscles: Muscle[];
}
export function MuscleInfo({ muscles }: MuscleInfoProps) {
    const muscleArray = Object.values(muscles);
    return (
        <YStack>
            <Text fontSize={18} fontWeight={600}>
                Spiergroepen
            </Text>
            <XStack gap={10} mt={10} flexWrap="wrap" justify={"flex-start"}>
                {muscleArray.map((muscle, index) => (
                    <MuscleItem
                        key={muscle.name}
                        name={muscle.name}
                        main={muscle.main}
                    />
                ))}
            </XStack>
        </YStack>
    );
}
