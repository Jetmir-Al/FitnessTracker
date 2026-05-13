import { View, Text, Alert, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import "@/global.css"
import { deleteAccount, logOut } from "@/services/authService";
import { auth } from "@/services/firebase";


const SafeAreaView = styled(RNSafeAreaView);

const Settings = () => {
    const user = auth.currentUser;

    const handleLogout = async () => {
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

    };
    const handleDeleteAccount = async () => {
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

    };

    return (
        <SafeAreaView className="bg-surface-900 mt-15 p-container flex-1 will-change-variable flex-column">
            <View className="flex-row items-center justify-evenly bg-surface-800 rounded-md  p-10 m-3 space-x-3">
                <Ionicons name="person-circle-outline" color={'#CCFF00'} size={50} />
                <View>
                    <Text className="text-surface-50 font-heading text-lg">
                        {user?.email || "Guest User"}
                    </Text>
                </View>
            </View>
            <View className="flex-row items-center justify-evenly bg-surface-800 rounded-md  p-4 m-3 space-y-4">
                <TouchableOpacity
                    onPress={async () => {
                        await handleLogout();
                    }}
                    className="flex-row items-center justify-center p-4 bg-red-500/10 border border-red-500/50 rounded-button"
                >
                    <Ionicons name="log-out-outline" color="#ef4444" size={20} />
                    <Text className="text-red-500 font-heading ml-2 text-lg">Sign Out</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={async () => {
                        await handleDeleteAccount();
                    }}
                    className="flex-row items-center justify-center p-4 bg-red-500/10 border border-red-500/50 rounded-button"
                >
                    <Ionicons name="trash-outline" color="#ef4444" size={20} />
                    <Text className="text-red-500 font-heading ml-2 text-lg">Delete</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Settings;