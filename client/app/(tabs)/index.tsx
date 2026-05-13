import { useCallback, useEffect, useState } from "react";
import { Text, View, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { getRecentWorkouts, Workout } from "@/services/workoutService";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect, useRouter } from "expo-router";

const SafeAreaView = styled(RNSafeAreaView);

export default function HomeScreen() {
  const router = useRouter();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    const data = await getRecentWorkouts();
    setWorkouts(data);
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <SafeAreaView className="bg-surface-900 mt-15 flex-1 p-container">
      <View className="bg-surface-800 p-6 rounded-card mb-6 border border-gray-800">
        <Text className="text-primary font-heading text-xl uppercase tracking-widest">Daily Progress</Text>
        <Text className="text-surface-100 font-mono text-4xl mt-2">{workouts.length} / 5</Text>
        <Text className="text-surface-400 color-white font-body text-sm mb-4">Workouts this session</Text>
        <View className="h-2 bg-gray-700 rounded-full">
          <View className={`h-full bg-primary rounded-full w-[${Math.min((workouts.length / 5) * 100, 100)}%]`} />
        </View>
      </View>

      <Text className="text-surface-50 font-heading text-2xl mb-4">Recent Activity</Text>

      {loading ? (
        <ActivityIndicator color="#CCFF00" />
      ) : (
        <FlatList
          data={workouts}
          keyExtractor={(item) => item.id}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#CCFF00" />}
          ListEmptyComponent={
            <Text className="bg-surface-800 p-3 rounded-card text-surface-400 color-white will-change-variable text-center font-body mt-10">No workouts recorded yet. Get moving! 🏋️‍♂️</Text>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push({
                pathname: "/(tabs)/exercises/[id]",
                params: { id: item.type }
              })}
            >
              <View className="bg-surface-800 p-4 rounded-card mb-3 flex-row items-center justify-between border border-gray-800">
                <View className="flex-row items-center">
                  <View className="bg-primary/20 p-2 rounded-full">
                    <Ionicons name="flash" size={20} color="#CCFF00" />
                  </View>
                  <View className="ml-4">
                    <Text className="text-surface-50 font-heading text-lg">{item.type}</Text>
                    <Text className="color-white text-xs">{new Date(item.date).toLocaleDateString()}</Text>
                  </View>
                </View>
                <View className="items-end">
                  <Text className="color-white font-heading">{item.duration}m</Text>
                  <Text className="color-white text-xs">{item.calories} kcal</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}