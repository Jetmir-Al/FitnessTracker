import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";


const ExerciseDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    return (
        <View>
            <Text>Halo id: {id}</Text>
        </View>
    )
}

export default ExerciseDetails;