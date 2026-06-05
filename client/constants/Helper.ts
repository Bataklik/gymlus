const exerciseContext = (require as any).context(
    "../assets/images/exercises",
    false,
    /\.png$/,
);

export const getLocalExerciseImage = (imageSourcePath: string) => {
    try {
        const filename = imageSourcePath.split("/").pop();
        if (!filename) return require("../assets/images/exercises/default.png");
        return exerciseContext(`./${filename}`);
    } catch (e) {
        console.log(imageSourcePath);
        console.log(e);
        return require("../assets/images/exercises/default.png");
    }
};
