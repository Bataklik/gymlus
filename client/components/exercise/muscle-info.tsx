import { YStack, XStack, Text } from "tamagui";
import { MuscleItem } from "./muscle-item";

interface MuscleInfoProps {
    muscles: { name: string; main: boolean }[];
}
export function MuscleInfo({ muscles }: MuscleInfoProps) {
    return (
        <YStack>
            <Text fontSize={18} fontWeight={600}>
                Muscles target
            </Text>
            <XStack gap={10} mt={10} flexWrap="wrap" justify={"flex-start"}>
                {muscles.map((muscle, index) => (
                    <MuscleItem
                        key={index}
                        name={muscle.name}
                        main={muscle.main}
                    />
                ))}
            </XStack>
        </YStack>
    );
}
