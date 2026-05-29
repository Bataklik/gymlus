import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { YStack, XStack, Text, Button } from "tamagui";

export default function CardScan() {
    return (
        <YStack
            elevation={10}
            bg="$accent11"
            blockSize={300}
            borderTopLeftRadius={20}
            borderTopRightRadius={20}
            borderBottomLeftRadius={20}
            borderBottomRightRadius={20}
            p={35}
        >
            <XStack
                paddingBlock={8}
                paddingInline={5}
                marginBlockEnd={10}
                width={80}
                justify={"center"}
                bg={"$accent2"}
                borderTopLeftRadius={10}
                borderTopRightRadius={10}
                borderBottomLeftRadius={10}
                borderBottomRightRadius={10}
            >
                <Text fontWeight={"$40"} color={"$accent8"}>
                    AI - SCAN
                </Text>
            </XStack>
            <YStack gap={12}>
                <YStack>
                    <Text fontSize={30}>Richt. Scan.</Text>
                    <Text fontSize={30}>Ken elke machine.</Text>
                </YStack>
                <Text color="$color8" fontSize={18}>
                    Identificeer direct fitnessapparaten en leer de juiste
                    techniek.
                </Text>
                <Button
                    borderTopLeftRadius={30}
                    borderTopRightRadius={30}
                    borderBottomLeftRadius={30}
                    borderBottomRightRadius={30}
                    bg="$accent7"
                    width={160}
                    onPress={() => router.push("/scan")}
                >
                    <XStack gap={8} justify={"center"}>
                        <Ionicons color="$color1" name="scan" size={18} />
                        <Text color="$color1" fontWeight={700}>
                            Snelle scan
                        </Text>
                    </XStack>
                </Button>
            </YStack>
        </YStack>
    );
}
