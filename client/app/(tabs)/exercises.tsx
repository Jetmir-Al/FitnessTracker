import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getRecentWorkouts, saveWorkout } from '@/services/workoutService';
import { AchievementModal } from '@/components/AchievementModal';
import { auth } from '@/services/firebase';

export default function AddWorkout() {
    const [type, setType] = useState('');
    const [duration, setDuration] = useState('');
    const [calories, setCalories] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [achievement, setAchievement] = useState({ title: '', desc: '' });

    const handleSave = async () => {
        if (!type || !duration) return Alert.alert("Error", "Please fill in at least the type and duration.");

        setIsSaving(true);

        try {
            const result = await saveWorkout({
                type,
                duration: Number(duration),
                calories: Number(calories) || 0,
                date: new Date().toISOString(),
                synced: !!auth.currentUser
            });

            if (result.success) {
                let currentAchievement = null;

                const history = await getRecentWorkouts();
                if (history.length === 10) {
                    currentAchievement = {
                        title: "Milestone Reached!",
                        desc: "10 Workouts completed. You're building a serious habit!"
                    };
                }
                else if (Number(calories) >= 500) {
                    currentAchievement = {
                        title: "CALORIE CRUSHER",
                        desc: "You just burned over 500 calories in a single session!"
                    };
                }

                if (currentAchievement) {
                    setAchievement(currentAchievement);
                    setShowModal(true);
                } else {
                    Alert.alert("Success", result.synced ? "Saved!" : "Saved Locally");
                }

                setType('');
                setDuration('');
                setCalories('');
            } else {
                Alert.alert("Error", "Problem saving data!");
                setType('');
                setDuration('');
                setCalories('');
            }

        } catch (error) {
            console.error("Save failed:", error);
            Alert.alert("Error", "An unexpected error occurred.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <ScrollView className="flex-1 bg-surface-900">
            <View className="max-w-[800px] w-full self-center px-container pt-12 pb-32 mt-10">
                <Text className="text-surface-50 text-3xl font-heading mb-2">Log Workout</Text>
                <Text className="color-white font-body mb-8">Track your progress and sync to the cloud.</Text>

                <View className="space-y-4 gap-5">
                    <View className="bg-surface-800 p-4 rounded-card flex-row items-center border border-gray-700">
                        <Ionicons name="barbell-outline" size={20} color={"#CCFF00"} />
                        <TextInput
                            className="flex-1 ml-3 text-surface-50 font-body text-lg"
                            placeholder="Workout Name (e.g. Deadlift)"
                            placeholderTextColor="#555"
                            value={type}
                            onChangeText={setType}
                        />
                    </View>

                    <View className="bg-surface-800 p-4 rounded-card flex-row items-center border border-gray-700">
                        <Ionicons name="time-outline" size={20} color={"#CCFF00"} />
                        <TextInput
                            className="flex-1 ml-3 text-surface-50 font-body text-lg"
                            placeholder="Duration (minutes)"
                            placeholderTextColor="#555"
                            keyboardType="numeric"
                            value={duration}
                            onChangeText={setDuration}
                        />
                    </View>

                    <View className="bg-surface-800 p-4 rounded-card flex-row items-center border border-gray-700">
                        <Ionicons name="flame-outline" size={20} color={"#CCFF00"} />
                        <TextInput
                            className="flex-1 ml-3 text-surface-50 font-body text-lg"
                            placeholder="Calories Burned"
                            placeholderTextColor="#555"
                            keyboardType="numeric"
                            value={calories}
                            onChangeText={setCalories}
                        />
                    </View>

                    <TouchableOpacity
                        onPress={handleSave}
                        className="p-5 rounded-button items-center mt-6 bg-primary"
                    >
                        <Text className="text-secondary font-heading text-xl">
                            {isSaving ? "Saving..." : "Save Workout"}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { setType(''); setDuration(''); setCalories(''); }} className="mt-4 items-center">
                        <Text className="color-white font-body">Clear Fields</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <AchievementModal
                visible={showModal}
                title={achievement.title}
                description={achievement.desc}
                onClose={() => setShowModal(false)}
            />
        </ScrollView>
    );

};