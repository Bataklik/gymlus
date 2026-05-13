import React from "react";
import { XStack } from "tamagui";
import StatsItem from "./stats-item";

interface CardStatsProps {
    dayStreak: number;
    scans: number;
    saved: number;
}

export default function CardStats({ dayStreak, scans, saved }: CardStatsProps) {
    return (
        <XStack
            gap={7}
            paddingInlineStart={5}
            paddingInlineEnd={5}
            justify={"space-evenly"}
        >
            <StatsItem
                iconName={"flame-outline"}
                iconColor={"orange"}
                value={dayStreak}
                label={"Day streak"}
            />
            <StatsItem
                iconName={"scan"}
                iconColor={"greenyellow"}
                value={scans}
                label={"Scans"}
            />
            <StatsItem
                iconName={"bookmark"}
                iconColor={"darkturquoise"}
                value={saved}
                label={"Saved"}
            />
        </XStack>
    );
}
