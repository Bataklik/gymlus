import { createV5Theme, defaultChildrenThemes } from "@tamagui/config/v5";
import { v5ComponentThemes } from "@tamagui/themes/v5";
import {
    yellow,
    yellowDark,
    red,
    redDark,
    green,
    greenDark,
} from "@tamagui/colors";

const darkPalette = [
    "hsla(220, 13%, 4%, 1)",
    "hsla(220, 13%, 9%, 1)",
    "hsla(220, 14%, 13%, 1)",
    "hsla(220, 12%, 17%, 1)",
    "hsla(220, 11%, 22%, 1)",
    "hsla(220, 10%, 28%, 1)",
    "hsla(220, 9%,  36%, 1)",
    "hsla(220, 8%,  46%, 1)",
    "hsla(220, 8%,  56%, 1)",
    "hsla(220, 8%,  66%, 1)",
    "hsla(220, 12%, 88%, 1)",
    "hsla(220, 13%, 96%, 1)",
];
const lightPalette = [
    "hsla(220, 20%, 99%, 1)",
    "hsla(220, 18%, 96%, 1)",
    "hsla(220, 16%, 92%, 1)",
    "hsla(220, 14%, 86%, 1)",
    "hsla(220, 12%, 78%, 1)",
    "hsla(220, 11%, 68%, 1)",
    "hsla(220, 10%, 56%, 1)",
    "hsla(220, 9%,  44%, 1)",
    "hsla(220, 10%, 32%, 1)",
    "hsla(220, 12%, 22%, 1)",
    "hsla(220, 14%, 12%, 1)",
    "hsla(220, 15%, 4%, 1)",
];

const accentLight = {
    accent1: "hsla(72, 80%, 40%, 1)",
    accent2: "hsla(72, 82%, 44%, 1)",
    accent3: "hsla(72, 84%, 48%, 1)",
    accent4: "hsla(72, 86%, 52%, 1)",
    accent5: "hsla(72, 88%, 56%, 1)",
    accent6: "hsla(72, 90%, 60%, 1)",
    accent7: "hsla(72, 92%, 64%, 1)",
    accent8: "hsla(72, 94%, 68%, 1)",
    accent9: "hsla(72, 96%, 72%, 1)",
    accent10: "hsla(72, 98%, 76%, 1)",
    accent11: "hsla(72, 30%, 14%, 1)",
    accent12: "hsla(220, 15%, 4%, 1)",
};

const accentDark = {
    accent1: "hsla(72, 60%, 32%, 1)",
    accent2: "hsla(72, 65%, 38%, 1)",
    accent3: "hsla(72, 70%, 44%, 1)",
    accent4: "hsla(72, 75%, 50%, 1)",
    accent5: "hsla(72, 80%, 56%, 1)",
    accent6: "hsla(72, 85%, 60%, 1)",
    accent7: "hsla(72, 90%, 63%, 1)",
    accent8: "hsla(72, 95%, 65%, 1)",
    accent9: "hsla(72, 100%, 65%, 1)",
    accent10: "hsla(72, 100%, 72%, 1)",
    accent11: "hsla(72, 30%, 12%, 1)",
    accent12: "hsla(220, 15%, 4%, 1)",
};

const builtThemes = createV5Theme({
    darkPalette,
    lightPalette,
    componentThemes: v5ComponentThemes,
    accent: {
        light: accentLight,
        dark: accentDark,
    },

    childrenThemes: {
        ...defaultChildrenThemes,
        warning: {
            light: yellow,
            dark: yellowDark,
        },
        error: {
            light: red,
            dark: redDark,
        },
        success: {
            light: green,
            dark: greenDark,
        },
    },
});

export type Themes = typeof builtThemes;

export const themes: Themes =
    process.env.TAMAGUI_ENVIRONMENT === "client" &&
    process.env.NODE_ENV === "production"
        ? ({} as any)
        : (builtThemes as any);
