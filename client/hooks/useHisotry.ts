import apiService from "@/services/api-services";
import { HistoryItemData } from "@/types";

export const useHistory = () => {
    async function fetchHistoryData(): Promise<HistoryItemData[]> {
        try {
            const response = await apiService.fetchHistory();
            const data = await response;
            return data.history as HistoryItemData[];
        } catch (error) {
            console.error("Error fetching history data:", error);
            return [];
        }
    }

    return { fetchHistoryData };
};
