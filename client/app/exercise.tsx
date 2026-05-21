import { YStack, XStack, ScrollView, Text, Button } from "tamagui";
import ScanHeader from "@/components/scan/scan-header";
import { router } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import { ExerciseInfoSection } from "@/components/exercise/exercise-info-section";
import { MuscleItem } from "@/components/exercise/muscle-item";
import { MuscleInfo } from "@/components/exercise/muscle-info";
import { Ionicons } from "@expo/vector-icons";

interface ExerciseInfoProps {
    title: string;
    description: string[];
}
function ExerciseDescription({ title, description }: ExerciseInfoProps) {
    return (
        <>
            <Text
                fontSize={26}
                width={"60%"}
                fontWeight="bold"
                color="$color12"
            >
                {title}
            </Text>
            <Text
                fontSize={14}
                width={"100%"}
                fontWeight="bold"
                color="$color10"
            >
                {description.join(" ")}
            </Text>
        </>
    );
}

export default function ExerciseDetail() {
    const closeHandler = () => {
        router.back();
    };
    const videoSource = require("../assets/videos/exercises/lat_pulldown.mp4");

    const player = useVideoPlayer(videoSource, (player) => {
        player.loop = true;
        player.play();
    });

    const muscles = [
        { name: "Latissimus Dorsi", main: true },
        { name: "Rhomboids", main: false },
        { name: "Trapezius", main: false },
        { name: "Biceps Brachii", main: false },
    ];

    return (
        <YStack
            flex={1}
            bg="$accent12"
            className="h-full"
            gap={20}
            paddingBlockStart={20}
        >
            <ScanHeader
                title="Exercise Detail"
                icon="barbell"
                closeHandler={closeHandler}
            />
            <YStack flex={1} gap={10}>
                <VideoView
                    style={{ width: "100%", height: 400 }}
                    player={player}
                    fullscreenOptions={{ enable: true }}
                />
                <ScrollView flex={1} width="100%" rounded="$4">
                    <YStack gap={10} p={5}>
                        <YStack gap={10} p={10}>
                            <ExerciseDescription
                                title="Cable Lat Pulldown"
                                description={[
                                    "Compound",
                                    "Pulling",
                                    "Cable Machine",
                                ]}
                            />
                            <ExerciseInfoSection
                                dicculty={70}
                                sets={3}
                                reps={8}
                                rest={90}
                            />
                            <MuscleInfo muscles={muscles} />
                        </YStack>
                        <XStack gap={10} p={10}></XStack>
                    </YStack>
                </ScrollView>
                <XStack justify="center" p={20}>
                    <Button
                        bg={"$accent4"}
                        borderWidth={1}
                        borderColor="$accent8"
                        borderRadius={25}
                        paddingHorizontal={20}
                        onClick={() => console.log("Save Exercise")}
                    >
                        <XStack gap={10} items={"center"}>
                            <Ionicons name="add" size={16} color="$accent12" />
                            <Text color="$accent12">Save Exercise</Text>
                        </XStack>
                    </Button>
                </XStack>
            </YStack>
        </YStack>
    );
}
