import { Link } from "expo-router";
import { View, Text } from "react-native";


const SignIn = () => {
    return (
        <View>
            <Text>Sign up</Text>
            <Link href={"/(auth)/login"}>Login</Link>
        </View>
    )
}

export default SignIn;