import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { YStack, XStack, Text, Button } from "tamagui";

export default function CardScan() {
    return (
        <YStack
            elevation={10}
            backgroundColor="$accent11"
            blockSize={300}
            borderTopLeftRadius={20}
            borderTopRightRadius={20}
            borderBottomLeftRadius={20}
            borderBottomRightRadius={20}
            padding={35}
        >
            <XStack
                paddingHorizontal={8}
                paddingVertical={5}
                marginBottom={10}
                width={80}
                justify={"center"}
                backgroundColor={"$accent2"}
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
                    <Text fontSize={30}>Point. Scan.</Text>
                    <Text fontSize={30}>Know any machine.</Text>
                </YStack>
                <Text color="$color8" fontSize={18}>
                    Identify gym equiment instantly and learn perfect form.
                </Text>
                <Button
                    borderTopLeftRadius={30}
                    borderTopRightRadius={30}
                    borderBottomLeftRadius={30}
                    borderBottomRightRadius={30}
                    backgroundColor="$accent7"
                    width={180}
                >
                    <XStack gap={8}>
                        <Ionicons color="$color1" name="scan" size={18} />
                        <Text color="$color1">Quick scan</Text>
                    </XStack>
                </Button>
            </YStack>
        </YStack>
    );
}
