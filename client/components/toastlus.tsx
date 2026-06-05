import React from "react";
import { Button, Toast, useToastState, YStack } from "tamagui";

interface ToastlusProps {
    title: string;
    description?: string;
    actionText?: string;
    onAction?: () => void;
}

export default function Toastlus({
    title,
    description,
    actionText,
    onAction,
}: ToastlusProps) {
    const currentToast = useToastState();

    if (!currentToast || currentToast.isHandledNatively) return null;
    return (
        <Toast
            key={currentToast.id}
            duration={currentToast.duration || 1500}
            enterStyle={{ opacity: 0, scale: 0.9, y: -20 }}
            exitStyle={{ opacity: 0, scale: 0.94, y: -10 }}
            y={0}
            opacity={1}
            scale={1}
            bg="$accent4"
            p="$3"
            borderWidth={1}
            borderColor="$accent8"
        >
            <YStack gap="$1" flex={1}>
                <Toast.Title fontWeight="600" color="$accent12">
                    {currentToast.title}
                </Toast.Title>

                {currentToast.description && (
                    <Toast.Description color="$accent11" fontSize={14}>
                        {currentToast.description}
                    </Toast.Description>
                )}
            </YStack>

            {/* Eventuele actie-knop die je hebt meegegeven bij het aanroepen */}
            {currentToast.action && (
                <Toast.Action
                    altText="Actie"
                    onPress={currentToast.action.onPress}
                >
                    <Button size="$2" bg="$accent6">
                        {currentToast.action.title}
                    </Button>
                </Toast.Action>
            )}
        </Toast>
    );
}
