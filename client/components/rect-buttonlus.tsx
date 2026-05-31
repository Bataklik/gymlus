import React from "react";
import { Button, XStack, Text } from "tamagui";

interface RectButtonlusProps {
    onPress: () => void;
    title: string;
    icon?: React.ReactNode;
}

export function RectButtonlus({ onPress, title, icon }: RectButtonlusProps) {
    return (
        <Button
            bg={"$accent4"}
            borderWidth={1}
            borderColor="$accent8"
            borderTopEndRadius="$4"
            borderTopStartRadius="$4"
            borderBottomStartRadius="$4"
            borderBottomEndRadius="$4"
            marginBlockEnd={"$5"}
            onPress={onPress}
        >
            <XStack gap={10} items={"center"}>
                {icon}
                <Text color="$accent12">{title}</Text>
            </XStack>
        </Button>
    );
}
