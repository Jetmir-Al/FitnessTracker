import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { saveWorkout } from '@/services/workoutService';

export default function AddWorkout() {
    const [type, setType] = useState('');
    const [duration, setDuration] = useState('');
    const [calories, setCalories] = useState('');

    const handleSave = async () => {
        if (!type || !duration) return Alert.alert("Error", "Please fill in the workout type.");

        const result = await saveWorkout({
            type,
            duration: Number(duration),
            calories: Number(calories),
            date: new Date().toISOString(),
        });

        if (result.success) {
            Alert.alert("Success", result.synced ? "Workout synced to cloud! 🔥" : "Saved locally! (Offline)");
            setType(''); setDuration(''); setCalories('');
        }
    };

    return (
        <View className="flex-1 bg-surface-900 p-container pt-12 will-change-variable">
            <Text className="text-surface-50 text-2xl font-heading mb-6">Log Workout</Text>

            {/* Input Fields */}
            <View className="space-y-4">
                <View className="bg-surface-800 p-workout rounded-card flex-row items-center border border-gray-700">
                    <Ionicons name="barbell-sharp" size={20} color={"#ffffff"} />
                    <TextInput
                        className="flex-1 ml-3 text-surface-50 font-body"
                        placeholder="Workout Type (e.g. Bench Press)"
                        placeholderTextColor="#888"
                        value={type}
                        onChangeText={setType}
                    />
                </View>

                <View className="bg-surface-800 p-workout rounded-card flex-row items-center border border-gray-700">
                    <Ionicons name="timer-outline" size={20} color={"#fff"} />
                    <TextInput
                        className="flex-1 ml-3 text-surface-50 font-body"
                        placeholder="Duration (mins)"
                        placeholderTextColor="#888"
                        keyboardType="numeric"
                        value={duration}
                        onChangeText={setDuration}
                    />
                </View>

                <TouchableOpacity
                    onPress={handleSave}
                    className="bg-primary p-4 rounded-button items-center mt-4"
                >
                    <Text className="text-secondary font-heading text-lg">Save Workout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}