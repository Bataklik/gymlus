import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { router } from "expo-router";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme, YStack, XStack, Circle, Text } from "tamagui";

export function TabBar({ state, navigation }: BottomTabBarProps) {
    const theme = useTheme();
    const insets = useSafeAreaInsets();

    const activeRouteName = state.routes[state.index].name;

    const Tab = ({
        routeName,
        label,
        icon,
        iconActive,
    }: {
        routeName: string;
        label: string;
        icon: keyof typeof Ionicons.glyphMap;
        iconActive: keyof typeof Ionicons.glyphMap;
    }) => {
        const focused = activeRouteName === routeName;
        return (
            <Pressable
                style={{ flex: 1 }}
                onPress={() => navigation.navigate(routeName)}
            >
                <YStack items="center" justify="center" gap="$1" py="$2">
                    <Ionicons
                        size={24}
                        name={focused ? iconActive : icon}
                        color={focused ? theme.accent9.val : theme.color8.val}
                    />
                    <Text
                        fontSize={11}
                        color={focused ? "$accent9" : "$color8"}
                        fontWeight={focused ? "700" : "500"}
                    >
                        {label}
                    </Text>
                </YStack>
            </Pressable>
        );
    };

    return (
        <XStack
            position="absolute"
            b={insets.bottom + 12}
            l="$4"
            r="$4"
            height={68}
            bg="rgba(20,22,26,0.86)"
            borderWidth={1}
            borderTopLeftRadius={15}
            borderTopRightRadius={15}
            borderBottomLeftRadius={15}
            borderBottomRightRadius={15}
            borderColor="$color4"
            items="center"
            px="$2"
        >
            <Tab
                routeName="index"
                label="Home"
                icon="home-outline"
                iconActive="home"
            />

            <Pressable
                style={{ flex: 1, alignItems: "center" }}
                onPress={() => router.push("/scan")}
            >
                <Circle
                    size={52}
                    bg="$accent9"
                    elevation={4}
                    shadowColor="$accent9"
                    shadowOpacity={0.5}
                    shadowRadius={12}
                >
                    <Ionicons
                        name="scan"
                        size={26}
                        color={theme.accent12.val}
                    />
                </Circle>
            </Pressable>

            <Tab
                routeName="history"
                label="History"
                icon="time-outline"
                iconActive="time"
            />
        </XStack>
    );
}
