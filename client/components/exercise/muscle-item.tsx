import { Muscle } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { XStack, Text } from "tamagui";

export function MuscleItem({ name, main }: Muscle) {
    return (
        <XStack
            bg={main ? "$accent3" : "$color7"}
            paddingBlock={5}
            paddingInline={10}
            rounded="$4"
            gap={8}
            justify={"center"}
            items="center"
        >
            {main && <Ionicons name="star" size={16} color="#facc15" />}
            <Text>{name}</Text>
        </XStack>
    );
}
