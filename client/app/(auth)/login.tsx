import { Link, useRouter } from "expo-router";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import "@/global.css"
import { useState } from "react";
import { logIn } from "@/services/authService";

const SafeAreaView = styled(RNSafeAreaView);

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const { user, error } = await logIn(email, password);
            if (error) {
                console.log("Firebase Error Object:", JSON.stringify(error, null, 2));
                Alert.alert("Invalid Credecials");
            }
            if (user) {
                Alert.alert("Welcome!", "Account created successfully.");
                router.replace('/(tabs)');
            } else {
                Alert.alert("Invalid Credecials");
            }
        } catch (error) {
            console.error("Critical Error:", error);
        }
    }

    return (
        <SafeAreaView className="bg-surface-900 p-container flex-1">
            <View className="flex-1 bg-surface-900 p-container justify-center">
                <Text className="text-surface-50 text-3xl font-heading mb-8">Log-In</Text>

                <View className="space-y-4 flex-column gap-3">
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
                        onPress={handleLogin}
                        className="bg-primary p-4 rounded-button items-center mt-6"
                    >
                        <Text className="text-secondary font-heading text-lg">Create Account</Text>
                    </TouchableOpacity>
                </View>
                <Link href={"/(auth)/sign-in"} className='mt-2 color-white gap-2 flex-row text-center justify-evenly w-[100%]'>
                    <Text>
                        Don`t have an account?
                    </Text>
                    <Text className='color-accent'>
                        ~Register now!
                    </Text>
                </Link>
            </View>
        </SafeAreaView>
    )
}

export default Login;