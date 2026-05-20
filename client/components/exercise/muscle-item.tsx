export function MuscleItem() {
    return (
        <XStack
            bg={"$accent3"}
            paddingBlock={5}
            paddingInline={10}
            rounded="$4"
            gap={8}
            justify={"center"}
            items="center"
        >
            <Ionicons name="ellipse" size={12} color="$color10" />
            <Text>Latissimus Dorsi</Text>
        </XStack>
    );
}
