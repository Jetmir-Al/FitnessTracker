import { Link } from "expo-router";
import { View, Text, TextInput } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import "@/global.css"

const SafeAreaView = styled(RNSafeAreaView);

const Login = () => {
    return (
        <SafeAreaView className="bg-surface-900 p-container flex-1">
            <View className="color-surface-50">
                <Text className="color-primary">Login</Text>
                <Link className="color-surface-50" href={"/(auth)/sign-in"}>Signup</Link>
                <Link className="color-surface-50" href={"/"}>Go Home</Link>
                <TextInput
                    onChangeText={() => { }}
                    value={""}
                />
                <TextInput
                    style={{ borderColor: "#888", borderRadius: 3 }}
                    onChangeText={() => { }}
                    value={""}
                    placeholder="useless placeholder"
                    keyboardType="numeric"
                />
            </View>
        </SafeAreaView>
    )
}

export default Login;