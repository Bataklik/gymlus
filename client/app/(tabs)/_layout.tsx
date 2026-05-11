import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "tamagui";

export default function Layout() {
    const theme = useTheme();
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: theme.accent11.val,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            size={24}
                            name={focused ? "home" : "home-outline"}
                            color={theme.background.val}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="scan"
                options={{
                    title: "Scan",
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            size={24}
                            name={focused ? "scan" : "scan-outline"}
                            color={theme.accent3.val}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: "History",
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            size={24}
                            name={focused ? "time" : "time-outline"}
                            color={theme.accent3.val}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
