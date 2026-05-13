import { YStack, XStack, Text, Image } from "tamagui";

export default function RecentlyScanned() {
    const scannedItems: ScannedItemProps[] = [
        {
            imageSrc:
                "https://fastly.picsum.photos/id/275/200/300.jpg?hmac=cSMNzJnIBeocVhMi8311gzgp4ZylFL2LlsUWtqobTEs",
            exerciseName: "Cable Lat Pullddown",
            exerciseCategory: "Back",
            exerciseTime: "2 days ago",
        },
        {
            imageSrc:
                "https://fastly.picsum.photos/id/45/200/300.jpg?hmac=mW2p9asL-scUozua98sWn1c03g7CYv7w7IIHwnFp4cM",
            exerciseName: "Seated Leg Press",
            exerciseCategory: "Legs",
            exerciseTime: "4 days ago",
        },
        {
            imageSrc:
                "https://fastly.picsum.photos/id/12/200/300.jpg?hmac=H975kfBbjoaBk4vHQpqpz-uxYLeRtC67xb6WSe_wPkk",
            exerciseName: "Chest Press",
            exerciseCategory: "Chest",
            exerciseTime: "7 days ago",
        },
    ];
    return (
        <YStack gap={15} paddingInline={8}>
            <XStack items={"center"} justify={"space-between"}>
                <Text fontWeight={900} fontSize={20}>
                    Recently scanned
                </Text>
                <Text
                    onClick={() => console.log("See all")}
                    fontSize={16}
                    color={"$accent7"}
                >
                    See all
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
