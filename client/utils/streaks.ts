import { HistoryItemData } from "@/types";
export function calculateDayStreak(history: HistoryItemData[]): number {
    if (history.length === 0) return 0;

    const uniqueDates = Array.from(
        new Set(
            history
                .map((item) => item.timestamp.split("T")[0])
                .sort((a, b) => new Date(b).getTime() - new Date(a).getTime()),
        ),
    );

    const todayStr = new Date().toISOString().split("T")[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    if (uniqueDates[0] !== todayStr && uniqueDates[0] !== yesterdayStr)
        return 0;

    let streak = 0;
    let checkDate = new Date(uniqueDates[0]);

    for (const dateStr of uniqueDates) {
        const currentDate = new Date(dateStr);
        const diffInDays = Math.floor(
            (checkDate.getTime() - currentDate.getTime()) /
                (1000 * 60 * 60 * 24),
        );

        if (diffInDays === 0 || diffInDays === 1) {
            streak++;
            checkDate = currentDate;
        } else {
            break;
        }
    }
    return streak;
}
