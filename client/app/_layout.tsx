import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { TamaguiProvider } from "tamagui";
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
                <StatusBar style="auto" />
            </TamaguiProvider>
        </Provider>
    );
}
