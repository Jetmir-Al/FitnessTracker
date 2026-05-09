import { View, Text } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const Settings = () => {
    return (
        <SafeAreaView className="bg-surface-900 p-container flex-1">
            <Text>Halo</Text>
        </SafeAreaView>
    )
}

export default Settings;