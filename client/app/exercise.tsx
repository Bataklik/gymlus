import { YStack, XStack, ScrollView, Text } from "tamagui";
import ScanHeader from "@/components/scan/scan-header";
import { router } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import { ExerciseInfoSection } from "@/components/exercise/exercise-info-section";
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
            <YStack gap={10} className="h-full">
                <VideoView
                    style={{ width: "100%", height: 400 }}
                    player={player}
                    fullscreenOptions={{ enable: true }}
                />
                <ScrollView maxH={259} width="100%" rounded="$4">
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
                            <YStack>
                                <Text fontSize={18} fontWeight={600}>
                                    Muscles target
                                </Text>
                                <XStack
                                    gap={10}
                                    mt={10}
                                    flexWrap="wrap"
                                    justify={"flex-start"}
                                >
                                    <MuscleItem />
                                    <MuscleItem />
                                    <MuscleItem />
                                </XStack>
                            </YStack>
                        </YStack>
                        <XStack gap={10} p={10}></XStack>
                    </YStack>
                </ScrollView>
            </YStack>
        </YStack>
    );
}
