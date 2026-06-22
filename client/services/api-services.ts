import { HistoryItemData } from "@/types";
import { getUniqueId } from "react-native-device-info";
class ApiService {
    async fetchExercise({ image }: { image: string | null }) {
        console.log("(fetchExercise) image changed:", image);
        if (!image) return;

        const imgData = new FormData();
        imgData.append("file", {
            uri: image,
            name: "exercise.jpg",
            type: "image/jpeg",
        } as any);
        // TODO
        const uniqueDeviceId = await getUniqueId()
            .then((id) => id)
            .catch((error) => `dev-${Date.now()}`);

        imgData.append("unique_device_id", uniqueDeviceId);

        console.log("(fetchExercise) Sending image to API...");
        console.log(imgData);

        return await fetch(process.env.EXPO_PUBLIC_API_URL + "/api/scan", {
            method: "POST",
            body: imgData,
        })
            .then((response) => {
                console.log("API response status:", response);
                return response.json();
            })
            .then((data) => {
                console.log("API response data:");
                console.log(data);
                return data;
            })
            .catch((error) => {
                console.error("Error calling API:");
                console.error(error);
                throw error;
            });
    }

    async fetchHistory() {
        console.log("(fetchHistory)");
        const uniqueDeviceId = await getUniqueId()
            .then((id) => id)
            .catch((error) => `dev-${Date.now()}`);

        return await fetch(
            process.env.EXPO_PUBLIC_API_URL + `/api/history/${uniqueDeviceId}`,
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.error("Error calling API:");
                console.error(error);
                throw error;
            });
    }

    async fetchHistoryItem(historyItemId: string) {
        console.log("(fetchHistoryItem) historyItemId:", historyItemId);
        return await fetch(
            process.env.EXPO_PUBLIC_API_URL +
                `/api/history/item/${historyItemId}`,
        )
            .then((response) => {
                console.log("API response status:", response);
                return response.json();
            })
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.error("Error calling API:");
                console.error(error);
                throw error;
            });
    }
}

const apiService = new ApiService();

export default apiService;
