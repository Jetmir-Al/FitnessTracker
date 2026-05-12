import { View, Text, Button } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import "@/global.css"

const SafeAreaView = styled(RNSafeAreaView);

const Settings = () => {
    return (
        <SafeAreaView className="bg-surface-900 p-container flex-1 will-change-variable flex-column">
            <View className="flex-row items-center justify-evenly bg-surface-800 rounded-md  p-10 m-3 space-x-3">
                <Ionicons name="person-circle-outline" color={'#CCFF00'} size={50} />
                <View>
                    <Text className="text-surface-50 font-heading text-lg">
                        User name
                    </Text>
                    <Text className="text-accent text-sm">
                        View Profile
                    </Text>
                </View>
            </View>
            <View className="flex-row items-center justify-evenly bg-surface-800 rounded-md  p-4 m-3 space-x-3">
                <Button title="Log out" color={"#22C55E"} onPress={() => window.alert("hello")} ></Button>
                <Button title="Delete" color={"#EF4444"} onPress={() => window.alert("hello")} ></Button>
            </View>
        </SafeAreaView>
    )
}

export default Settings;