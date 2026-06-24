import { router } from "expo-router";
import { ExerciseSummary, HistoryItemData } from "@/types";
import { getExerciseImage } from "@/utils/image-helper";
import { YStack, XStack, Text, Image } from "tamagui";
import { TouchableOpacity } from "react-native";
interface RecentlyScannedProps {
    recentlyScanned?: HistoryItemData[];
}

export default function RecentlyScanned({
    recentlyScanned,
}: RecentlyScannedProps) {
    console.log("RecentlyScanned component received recentlyScanned prop:");
    console.log(recentlyScanned);
    return (
        <YStack gap={15} paddingInline={8}>
            <XStack items={"center"} justify={"space-between"}>
                <Text fontWeight={900} fontSize={20}>
                    Onlangs gescand
                </Text>
                <TouchableOpacity onPress={() => router.push("/history")}>
                    <Text fontSize={16} color={"$accent7"}>
                        Alles zien
                    </Text>
                </TouchableOpacity>
            </XStack>
            <XStack
                gap={10}
                justify={"center"}
                paddingBlock={10}
                overflow={"scroll"}
            >
                {recentlyScanned && recentlyScanned.length > 0 ? (
                    recentlyScanned.map((item) => (
                        <ScannedItem
                            key={item.id}
                            item={item.exercise}
                            timestamp={item.timestamp}
                        />
                    ))
                ) : (
                    <Text color={"$color9"}>Geen recente scans</Text>
                )}
            </XStack>
        </YStack>
    );
}

function ScannedItem({
    item,
    timestamp,
}: {
    item: ExerciseSummary;
    timestamp: string;
}) {
    const { image_source, display_name, force_type } = item;
    return (
        <YStack gap={5}>
            <Image
                src={getExerciseImage(image_source)}
                width={120}
                height={180}
                borderTopLeftRadius={20}
                borderTopRightRadius={20}
                borderBottomRightRadius={20}
                borderBottomLeftRadius={20}
                objectFit="cover"
            />

            <YStack>
                <Text fontSize={12}>
                    {display_name.length > 16
                        ? display_name.substring(0, 16) + "..."
                        : display_name}
                </Text>
                <Text color={"$color9"}>
                    {force_type} • {new Date(timestamp).toLocaleDateString()}
                </Text>
            </YStack>
        </YStack>
    );
}
