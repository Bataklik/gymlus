import { YStack, Text } from "tamagui";

interface ExerciseInfoProps {
    title: string;
    content: React.ReactNode;
}
export function ExerciseInfo({ title, content }: ExerciseInfoProps) {
    return (
        <YStack
            gap={10}
            items={"flex-start"}
            bg={"$color3"}
            p={10}
            rounded="$4"
            borderColor={"$color5"}
            borderWidth={1}
            width={"33%"}
        >
            <Text fontSize={14} fontWeight="700" color="$color9">
                {title}
            </Text>
            {content}
        </YStack>
    );
}
