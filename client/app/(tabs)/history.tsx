import Header from "@/components/layout/header";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Input, ScrollView, XStack, YStack, Text } from "tamagui";

export default function History() {
    return (
        <YStack flex={1} bg="$accent12" gap={20} paddingBlockStart={20}>
            <Header
                title="History"
                onSettingsPress={() => console.log("Settings pressed")}
            />
            <YStack gap={15} paddingInline={8}>
                <Input
                    size="$4"
                    placeholder={"Search history..."}
                    placeholderTextColor={"$color10"}
                    borderWidth={2}
                />

                <ScrollView>
                    <XStack justify={"space-between"} paddingBlock={10}>
                        <XStack gap={10}>
                            <Image
                                src={"https://placehold.co/75.jpg"}
                                style={{
                                    width: 75,
                                    height: 75,
                                    borderRadius: 10,
                                }}
                            />
                            <YStack>
                                <Text fontWeight={800} fontSize={18}>
                                    Cable Lat Pulldown
                                </Text>
                                <Text fontSize={14} color={"$color11"}>
                                    Back - 8:42 AM
                                </Text>
                            </YStack>
                        </XStack>
                        <YStack justify={"center"}>
                            <Ionicons
                                name="chevron-forward"
                                size={18}
                                color={"white"}
                            />
                        </YStack>
                    </XStack>
                </ScrollView>
            </YStack>
        </YStack>
    );
}
