import { YStack, XStack, Text, Image } from "tamagui";

export default function RecentlyScanned() {
    const scannedItems: ScannedItemProps[] = [
        {
            imageSrc: require("../../assets/images/exercises/lat_pulldown.png"),
            exerciseName: "Cable Lat Pullddown",
            exerciseCategory: "Back",
            exerciseTime: "2 days ago",
        },
        {
            imageSrc: require("../../assets/images/exercises/bench_press.png"),
            exerciseName: "Bench Press",
            exerciseCategory: "Chest",
            exerciseTime: "4 days ago",
        },
        {
            imageSrc: require("../../assets/images/exercises/seated_row.png"),
            exerciseName: "Seated Row",
            exerciseCategory: "Back",
            exerciseTime: "7 days ago",
        },
    ];
    return (
        <YStack gap={15} paddingInline={8}>
            <XStack items={"center"} justify={"space-between"}>
                <Text fontWeight={900} fontSize={20}>
                    Onlangs gescand
                </Text>
                <Text
                    onClick={() => console.log("See all")}
                    fontSize={16}
                    color={"$accent7"}
                >
                    Alles zien
                </Text>
            </XStack>
            <XStack gap={10} justify={"center"}>
                {scannedItems.map((item, index) => (
                    <ScannedItem key={index} {...item} />
                ))}
            </XStack>
        </YStack>
    );
}

interface ScannedItemProps {
    imageSrc: string;
    exerciseName: string;
    exerciseCategory: string;
    exerciseTime: string;
}

function ScannedItem({
    imageSrc,
    exerciseName,
    exerciseCategory,
    exerciseTime,
}: ScannedItemProps) {
    return (
        <YStack gap={5}>
            <Image
                src={imageSrc}
                width={120}
                height={180}
                borderTopLeftRadius={20}
                borderTopRightRadius={20}
                borderBottomRightRadius={20}
                borderBottomLeftRadius={20}
                objectFit="cover"
            />

            <YStack>
                <Text>{exerciseName}</Text>
                <Text color={"$color9"}>
                    {exerciseCategory} - {exerciseTime}
                </Text>
            </YStack>
        </YStack>
    );
}
