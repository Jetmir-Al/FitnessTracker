import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { getExerciseHistory, Workout } from "@/services/workoutService";

const ExerciseDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [history, setHistory] = useState<Workout[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            if (id) {
                const data = await getExerciseHistory(id);
                setHistory(data);
            }
            setLoading(false);
        };
        fetchHistory();
    }, [id]);

    const totalMinutes = history.reduce((acc, curr) => acc + curr.duration, 0);

    return (
        <View className="flex-1 bg-surface-900 p-container pt-12 mt-15">
            <View className="mb-8">
                <Text className="text-primary font-heading text-sm uppercase tracking-widest">Exercise Report</Text>
                <Text className="text-surface-50 text-4xl font-heading mt-1">{id}</Text>
            </View>

            <View className="flex-row space-x-4 mb-8 gap-3">
                <View className="flex-1 bg-surface-800 p-4 rounded-card border border-gray-800">
                    <Text className="color-white text-xs font-body uppercase">Total Sessions</Text>
                    <Text className="text-surface-50 text-2xl font-mono">{history.length}</Text>
                </View>
                <View className="flex-1 bg-surface-800 p-4 rounded-card border border-gray-800">
                    <Text className="color-white text-xs font-body uppercase">Total Mins</Text>
                    <Text className="text-surface-50 text-2xl font-mono">{totalMinutes}</Text>
                </View>
            </View>

            <Text className="text-surface-50 font-heading text-xl mb-4">Past Sessions</Text>

            {loading ? (
                <ActivityIndicator color="#CCFF00" />
            ) : (
                <FlatList
                    data={history}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View className="bg-surface-800 p-4 rounded-card mb-3 flex-row justify-between items-center border border-gray-800">
                            <View>
                                <Text className="text-surface-50 font-body text-lg">
                                    {new Date(item.date).toLocaleDateString()}
                                </Text>
                                <Text className="color-white text-sm">{item.calories} calories burned</Text>
                            </View>
                            <View className="bg-primary/10 px-3 py-1 rounded-pill">
                                <Text className="text-primary font-heading">{item.duration}m</Text>
                            </View>
                        </View>
                    )}
                    ListEmptyComponent={
                        <Text className="color-white text-center mt-10">No history for this exercise yet.</Text>
                    }
                />
            )}
        </View>
    );
};

export default ExerciseDetails;