import { YStack, XStack, ScrollView, Text, Spinner } from "tamagui";
import { toast } from "@tamagui/toast/v2";
import ScanHeader from "@/components/scan/scan-header";
import { router, useLocalSearchParams } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import { ExerciseInfoSection } from "@/components/exercise/exercise-info-section";
import { MuscleInfo } from "@/components/exercise/muscle-info";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "@/features/favorites/favoritesSlice";
import { Exercise } from "@/types";
import { ExerciseDescription } from "@/components/exercise/exercise-description";
import { RectButtonlus } from "@/components/rect-buttonlus";
import { RootState } from "@/store";
import { useState } from "react";
import { useExerciseDetail } from "@/hooks/useExeciseDetail";

export default function ExerciseDetail() {
    const { parseJson } = useExerciseDetail();
    const { data } = useLocalSearchParams();
    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.favorites.items);
    const exercise: Exercise = parseJson(data);

    const isFavorite = favorites.some((item) => item.id === exercise.id);
    const [isLoading, setIsLoading] = useState(false);
    const handleSaveExercise = (exercise: Exercise) => {
        console.log("(handleSaveExercise)");
        if (isFavorite) {
            toast.error("Oefening is al favoriet", {
                description: "Deze oefening staat al in je favorieten.",
            });
            return;
        }
        setIsLoading(true);
        try {
            dispatch(addFavorite(exercise));
            toast.success("Oefening opgeslagen", {
                description: "De oefening is toegevoegd aan je favorieten.",
            });
        } catch (error) {
            console.error("Error adding favorite:", error);
            toast.error("Fout bij opslaan", {
                description:
                    "Er is een fout opgetreden bij het opslaan van de oefening.",
            });
        }

        dispatch(addFavorite(exercise));
        closeHandler();
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
                                        <XStack
                                            key={
                                                `instruction-${index}` || index
                                            }
                                            gap={10}
                                        >
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
                    {isLoading ? (
                        <Spinner size="large" color="$accent6" />
                    ) : (
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
                    )}
                </XStack>
            </YStack>
        </YStack>
    );
}
