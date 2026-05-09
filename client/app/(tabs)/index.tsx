import { Text, View } from "react-native";
import "@/global.css"
import { Link } from "expo-router";
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);
export default function App() {

  return (
    <SafeAreaView className="bg-surface-900 p-container flex-1">

      <View>
        <View className="bg-surface-800 p-workout rounded-card">
          <Text className="text-primary font-heading text-xl">Daily Goal</Text>
          <Text className="text-surface-100 font-mono text-3xl">8,402 / 10,000</Text>
          <View className="h-2 bg-gray-700 rounded-pill mt-2">
            <View className="h-full bg-primary w-[84%] rounded-pill" />
          </View>
        </View>
        <Link href="/(auth)/sign-in" className="mt-4 rounded color-primary text-3xl">Sing up</Link>
        <Link href={{
          pathname: "/(tabs)/exercises/[id]",
          params: { id: "exercise" }
        }} className="mt-4 rounded color-primary text-3xl">Exercise</Link>
      </View>
    </SafeAreaView>
  );
}