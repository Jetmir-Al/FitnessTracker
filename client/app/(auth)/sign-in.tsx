import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { signUp } from '@/services/authService';
import { useRouter } from 'expo-router';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSignUp = async () => {
        try {

            const { user, error } = await signUp(email, password);
            if (error) {
                console.log("Firebase Error Object:", JSON.stringify(error, null, 2));
                Alert.alert("Error", error);
            }
            if (user) {
                Alert.alert("Welcome!", "Account created successfully.");
                router.replace('/(tabs)');
            } else {
                Alert.alert("Error", error);
            }
        } catch (error) {
            console.error("Critical Error:", error);
        }
    };

    return (
        <View className="flex-1 bg-surface-900 p-container justify-center">
            <Text className="text-surface-50 text-3xl font-heading mb-8">Join the Club</Text>

            <View className="space-y-4">
                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#888"
                    className="bg-surface-800 p-4 rounded-card text-surface-50 border border-gray-700"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#888"
                    className="bg-surface-800 p-4 rounded-card text-surface-50 border border-gray-700"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity
                    onPress={handleSignUp}
                    className="bg-primary p-4 rounded-button items-center mt-6"
                >
                    <Text className="text-secondary font-heading text-lg">Create Account</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default SignIn;