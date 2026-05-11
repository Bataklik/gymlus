import { createTamagui } from "@tamagui/core";
import { defaultConfig } from "@tamagui/config/v5";
import { themes } from "./constants/theme";

export const config = createTamagui({ ...defaultConfig, themes });

type Conf = typeof config;

declare module "@tamagui/core" {
    interface TamaguiCustomConfig extends Conf {}
}
