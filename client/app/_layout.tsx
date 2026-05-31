import "@tamagui/native/setup-burnt";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { TamaguiProvider, ToastProvider, ToastViewport } from "tamagui";
import { config } from "../tamagui.config";
import { Provider } from "react-redux";
import { store } from "./store";
export const unstable_settings = {
    anchor: "(tabs)",
};

export default function RootLayout() {
    return (
        <Provider store={store}>
            <TamaguiProvider config={config} defaultTheme={"dark"}>
                <ToastProvider>
                    <Stack
                        screenOptions={{
                            headerShown: false,
                        }}
                    >
                        <Stack.Screen
                            name="(tabs)"
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="scan"
                            options={{
                                presentation: "fullScreenModal",
                                animation: "slide_from_bottom",
                            }}
                        />
                        <Stack.Screen
                            name="exercise_detail"
                            options={{ animation: "slide_from_right" }}
                        />
                    </Stack>
                    <ToastViewport top={60} left={0} right={0} />
                    <StatusBar style="auto" />
                </ToastProvider>
            </TamaguiProvider>
        </Provider>
    );
}
