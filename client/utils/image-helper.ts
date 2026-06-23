const exerciseImages = (require as any).context(
    "../assets/images/exercises",
    true,
    /\.(png|jpe?g|svg)$/,
);

export const getExerciseImage = (imagePath: string): any => {
    try {
        const filename = imagePath.split("/").pop();
        return exerciseImages(`./${filename}`);
    } catch (error) {
        console.error("Error loading exercise image:", error);
        return require("../assets/images/exercises/default.png");
    }
};
