import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { saveWorkout } from '@/services/workoutService';
import { AchievementModal } from '@/components/AchievementModal';

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
        const result = await saveWorkout({
            type,
            duration: Number(duration),
            calories: Number(calories) || 0,
            date: new Date().toISOString(),
        });
        setIsSaving(false);

        if (result.success) {
            if (Number(calories) >= 500) {
                setAchievement({
                    title: "CALORIE CRUSHER",
                    desc: "You just burned over 500 calories in a single session! You're on fire today."
                });
                setShowModal(true);
            } else {
                Alert.alert("Success", "Workout logged!");
            }
        }
        Alert.alert("Success", result.synced ? "Synced to Cloud! " : "Saved Locally");
        setType('');
        setDuration('');
        setCalories('');
    }

    return (
        <ScrollView className="flex-1 bg-surface-900 px-container pt-12 mt-15">
            <Text className="text-surface-50 text-3xl font-heading mb-2">Log Workout</Text>
            <Text className="text-surface-400 font-body mb-8">Track your progress and sync to the cloud.</Text>

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

                {/* Save Button */}
                <TouchableOpacity
                    onPress={handleSave}
                    disabled={isSaving}
                    className={`p-5 rounded-button items-center mt-6 ${isSaving ? 'bg-surface-700' : 'bg-primary'}`}
                >
                    <Text className="text-secondary font-heading text-xl">
                        {isSaving ? "Saving..." : "Save Workout"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setType(''); setDuration(''); setCalories(''); }} className="mt-4 items-center">
                    <Text className="text-surface-500 font-body">Clear Fields</Text>
                </TouchableOpacity>
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