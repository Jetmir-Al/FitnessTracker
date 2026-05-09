import { Link } from "expo-router";
import { View, Text } from "react-native";


const Login = () => {
    return (
        <View>
            <Text>Login</Text>
            <Link href={"/(auth)/sign-in"}>Signup</Link>
            <Link href={"/"}>Go Home</Link>
        </View>
    )
}

export default Login;