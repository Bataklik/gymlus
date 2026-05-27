import { YStack, XStack, ScrollView, Text, Button } from "tamagui";
import ScanHeader from "@/components/scan/scan-header";
import { router, useLocalSearchParams } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import { ExerciseInfoSection } from "@/components/exercise/exercise-info-section";
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
                {/*https://medium.com/@tajammalmaqbool11/capitalize-the-first-letter-in-javascript-with-one-liner-45b482e3dcf5*/}
                {description
                    .map(
                        (description) =>
                            description.charAt(0).toUpperCase() +
                            description.slice(1),
                    )
                    .join(" • ")}
            </Text>
        </>
    );
}
type exerciseType = {
    display_name: string;
    equipment_tag: string;
    instructions: string[];
    target_muscles: { name: string; main: boolean }[];
    difficulty: number;
    suggested_sets_reps: string;
    suggested_rest_seconds: number;
    mechanics: string;
    force_type: string;
    equipment_type: string;
};

export default function ExerciseDetail() {
    const { data } = useLocalSearchParams();
    const exercise: exerciseType = {
        display_name: JSON.parse(data as string).display_name,
        equipment_tag: JSON.parse(data as string).equipment_tag,
        instructions: JSON.parse(data as string).instructions,
        mechanics: JSON.parse(data as string).mechanics,
        force_type: JSON.parse(data as string).force_type,
        equipment_type: JSON.parse(data as string).equipment_type,
        target_muscles: JSON.parse(data as string).target_muscles.map(
            (muscle: any) => ({
                name: muscle.name,
                main: muscle.main,
            }),
        ),
        difficulty: JSON.parse(data as string).difficulty,
        suggested_sets_reps: JSON.parse(data as string).suggested_sets_reps,
        suggested_rest_seconds: JSON.parse(data as string)
            .suggested_rest_seconds,
    };

    const closeHandler = () => {
        router.back();
    };
    // https://stackoverflow.com/questions/73361987/how-to-use-an-image-from-a-path-in-react-typescript-without-import-or-require

    const videoSources: { [key: string]: any } = {
        lat_pulldown: require("../assets/videos/exercises/lat_pulldown.mp4"),
        bench_press: require("../assets/videos/exercises/bench_press.mp4"),
        seated_row: require("../assets/videos/exercises/seated_row.mp4"),
    };

    const videoSource =
        videoSources[exercise.equipment_tag] ||
        require("../assets/videos/exercises/lat_pulldown.mp4");

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
                                title={exercise.display_name}
                                description={[
                                    exercise.mechanics,
                                    exercise.force_type,
                                    exercise.equipment_type,
                                ]}
                            />
                            <ExerciseInfoSection
                                difficulty={exercise.difficulty}
                                sets_reps={exercise.suggested_sets_reps}
                                rest={exercise.suggested_rest_seconds}
                            />
                            <MuscleInfo muscles={exercise.target_muscles} />
                        </YStack>
                        <XStack gap={10} p={10}></XStack>
                    </YStack>
                </ScrollView>
                <XStack justify="center" p={20}>
                    <Button
                        bg={"$accent4"}
                        borderWidth={1}
                        borderColor="$accent8"
                        borderTopEndRadius="$4"
                        borderTopStartRadius="$4"
                        borderBottomStartRadius="$4"
                        borderBottomEndRadius="$4"
                        marginBlockEnd={"$5"}
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
