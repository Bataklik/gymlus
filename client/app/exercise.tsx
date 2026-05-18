import { YStack, Text, XStack } from "tamagui";
import ScanHeader from "@/components/scan/scan-header";
import { router } from "expo-router";

export default function ExerciseDetail() {
    const closeHandler = () => {
        router.back();
    };

    return (
        <YStack
            flex={1}
            backgroundColor="$accent12"
            gap={20}
            paddingBlockStart={20}
        >
            <ScanHeader
                title="Exercise Detail"
                icon="barbell"
                closeHandler={closeHandler}
            />
            <XStack gap={10}>
                <Text>Exercise Detail Content</Text>
            </XStack>
        </YStack>
    );
}
