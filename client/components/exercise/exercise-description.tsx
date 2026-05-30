import { Text } from "tamagui";

interface ExerciseInfoProps {
    title: string;
    description: string[];
}
export function ExerciseDescription({ title, description }: ExerciseInfoProps) {
    return (
        <>
            <Text
                fontSize={26}
                width={"60%"}
                fontWeight="bold"
                color="$color12"
            >
                {title}
            </Text>
            <Text
                fontSize={14}
                width={"100%"}
                fontWeight="bold"
                color="$color10"
            >
                {/*https://medium.com/@tajammalmaqbool11/capitalize-the-first-letter-in-javascript-with-one-liner-45b482e3dcf5*/}
                {description
                    .map(
                        (description) =>
                            description.charAt(0).toUpperCase() +
                            description.slice(1),
                    )
                    .join(" • ")}
            </Text>
        </>
    );
}
