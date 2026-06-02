import { ExerciseSummary } from "@/types";
import { YStack, XStack, Text, Image } from "tamagui";

export default function RecentlyScanned() {
    const scannedItems: ExerciseSummary[] = [
        {
            id: "1",
            imageSrc: require("../../assets/images/exercises/lat_pulldown.png"),
            display_name: "Cable Lat Pulldown",
            equipment_tag: "Back",
            equipment_type: "Cable",
        },
        {
            id: "2",
            imageSrc: require("../../assets/images/exercises/bench_press.png"),
            display_name: "Bench Press",
            equipment_tag: "Chest",
            equipment_type: "Barbell",
        },
        {
            id: "3",
            imageSrc: require("../../assets/images/exercises/seated_row.png"),
            display_name: "Seated Row",
            equipment_tag: "Back",
            equipment_type: "Cable",
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
                    <ScannedItem
                        key={item.id || item.equipment_tag}
                        {...item}
                    />
                ))}
            </XStack>
        </YStack>
    );
}

function ScannedItem(item: ExerciseSummary) {
    const { imageSrc, display_name, equipment_tag, equipment_type } = item;
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
                <Text>{display_name}</Text>
                <Text color={"$color9"}>
                    {equipment_tag} - {equipment_type}
                </Text>
            </YStack>
        </YStack>
    );
}
