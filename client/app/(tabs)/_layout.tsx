import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "tamagui";
import { TabBar } from "@/components/layout/tabbar";

export default function Layout() {
    const theme = useTheme();
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
            }}
            tabBar={(props) => <TabBar {...props} />}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            size={24}
                            name={focused ? "home" : "home-outline"}
                            color={
                                focused ? theme.accent3.val : theme.color8.val
                            }
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
                            color={
                                focused ? theme.accent3.val : theme.color8.val
                            }
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
