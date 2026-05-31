import { YStack, XStack, ScrollView, Text } from "tamagui";
import { toast } from "@tamagui/toast/v2";
import ScanHeader from "@/components/scan/scan-header";
import { router, useLocalSearchParams } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import { ExerciseInfoSection } from "@/components/exercise/exercise-info-section";
import { MuscleInfo } from "@/components/exercise/muscle-info";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addFavorite } from "@/features/favorites/favoritesSlice";
import { FavoriteItem, Muscle } from "@/types";
import { ExerciseDescription } from "@/components/exercise/exercise-description";
import { RectButtonlus } from "@/components/rect-buttonlus";

export default function ExerciseDetail() {
    const { data } = useLocalSearchParams();
    const dispatch = useDispatch();
    const exercise: FavoriteItem = {
        id: JSON.parse(data as string).id,
        display_name: JSON.parse(data as string).display_name,
        equipment_tag: JSON.parse(data as string).equipment_tag,
        instructions: JSON.parse(data as string).instructions,
        mechanics: JSON.parse(data as string).mechanics,
        force_type: JSON.parse(data as string).force_type,
        equipment_type: JSON.parse(data as string).equipment_type,
        target_muscles: JSON.parse(data as string).target_muscles.map(
            (muscle: Muscle) => ({
                name: muscle.name,
                main: muscle.main,
            }),
        ),
        difficulty: JSON.parse(data as string).difficulty,
        suggested_sets_reps: JSON.parse(data as string).suggested_sets_reps,
        suggested_rest_seconds: JSON.parse(data as string)
            .suggested_rest_seconds,
    };

    const handleSaveExercise = (exercise: FavoriteItem) => {
        console.log("Saving exercise:");
        dispatch(addFavorite(exercise));
        router.back();
        showToast();
    };
    const showToast = () => {
        toast("Oefening opgeslagen", {
            description: "De oefening is toegevoegd aan je favorieten.",
        });
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
                title="Oefening Details"
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
                        <YStack gap={10} p={10}>
                            <XStack>
                                <Text
                                    fontSize={18}
                                    fontWeight="bold"
                                    color="$color12"
                                >
                                    Instructies
                                </Text>
                            </XStack>
                            <YStack gap={5}>
                                {exercise.instructions.map(
                                    (instruction, index) => (
                                        <XStack key={index} gap={10}>
                                            <XStack
                                                bg="$accent1"
                                                opacity={0.6}
                                                width={30}
                                                height={30}
                                                borderTopRightRadius={15}
                                                borderBottomRightRadius={15}
                                                borderTopLeftRadius={15}
                                                borderBottomLeftRadius={15}
                                                items="center"
                                                justify="center"
                                            >
                                                <Text
                                                    fontSize={16}
                                                    fontWeight="600"
                                                    color="$accent6"
                                                >
                                                    {index + 1}
                                                </Text>
                                            </XStack>
                                            <Text
                                                fontSize={16}
                                                fontWeight="600"
                                                color="$color10"
                                            >
                                                {instruction}
                                            </Text>
                                        </XStack>
                                    ),
                                )}
                            </YStack>
                        </YStack>
                    </YStack>
                </ScrollView>
                <XStack justify="center" p={20}>
                    <RectButtonlus
                        onPress={() => handleSaveExercise(exercise)}
                        icon={
                            <Ionicons
                                name="heart-outline"
                                size={16}
                                color="$accent12"
                            />
                        }
                        title="Sla oefening op"
                    />
                </XStack>
            </YStack>
        </YStack>
    );
}
