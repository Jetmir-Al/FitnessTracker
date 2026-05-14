import { View, Text, Alert, TouchableOpacity, Platform } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import "@/global.css"
import { deleteAccount, logOut } from "@/services/authService";
import { auth } from "@/services/firebase";
import { syncOfflineWorkouts } from "@/services/workoutService";
import { useState } from "react";

const SafeAreaView = styled(RNSafeAreaView);

const Settings = () => {
    const user = auth.currentUser;
    const [isSyncing, setIsSyncing] = useState(false);
    const handleManualSync = async () => {
        setIsSyncing(true);
        await syncOfflineWorkouts();
        setIsSyncing(false);
    };
    const handleLogout = async () => {
        if (Platform.OS === 'web') {
            const result = await logOut();
            if (!result.success) {
                Alert.alert("Error", result.error);
            }
        } else {
            Alert.alert(
                'Are you sure you want to logout?',
                '',
                [
                    {
                        text: 'Cancel',
                        onPress: () => { },
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: async () => {
                            const result = await logOut();
                            if (!result.success) {
                                Alert.alert("Error", result.error);
                            }
                        },
                        style: 'default'

                    }
                ],
                {
                    cancelable: true
                },
            );
        }

    };
    const handleDeleteAccount = async () => {
        if (Platform.OS === "web") {
            const result = await deleteAccount();
            if (!result.success) {
                Alert.alert("Try login out and back in to delete your account");
            }
        } else {
            Alert.alert(
                'Are you sure you want to delete your account?',
                '',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: async () => {
                            const result = await deleteAccount();
                            if (!result.success) {
                                Alert.alert("Try login out and back in to delete your account");
                            }
                        },
                        style: 'destructive'

                    }
                ],
                {
                    cancelable: true
                },
            );
        }

    };

    return (
        <SafeAreaView className="bg-surface-900 flex-1">
            <View className="max-w-[600px] w-full self-center p-container pt-10">
                <View className="flex-row items-center justify-evenly bg-surface-800 rounded-md p-10 m-3 space-x-3">
                    <Ionicons name="person-circle-outline" color={'#CCFF00'} size={50} />
                    <View>
                        <Text className="text-surface-50 font-heading text-lg">
                            {user?.email || "Guest User"}
                        </Text>
                    </View>
                </View>
                <View className="flex-row items-center justify-evenly bg-surface-800 rounded-md p-4 m-3 space-x-4 gap-3">
                    <TouchableOpacity
                        onPress={async () => await handleLogout()}
                        className="flex-1 flex-row items-center justify-center p-4 bg-red-500/10 border border-red-500/50 rounded-button"
                    >
                        <Ionicons name="log-out-outline" color="#ef4444" size={15} />
                        <Text className="text-red-500 font-heading ml-2 text-lg">Sign Out</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={async () => await handleDeleteAccount()}
                        className="flex-1 flex-row items-center justify-center p-4 bg-red-500/10 border border-red-500/50 rounded-button"
                    >
                        <Ionicons name="trash-outline" color="#ef4444" size={15} />
                        <Text className="text-red-500 font-heading ml-2 text-lg">Delete</Text>
                    </TouchableOpacity>
                </View>
                <View className="px-3">
                    <TouchableOpacity
                        onPress={async () => await handleManualSync()}
                        disabled={isSyncing}
                        className="bg-surface-800 p-4 rounded-card border border-primary mt-4"
                    >
                        <Text className="text-primary text-center font-heading">
                            {isSyncing ? "Syncing Cloud Data..." : "Sync Now"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Settings;