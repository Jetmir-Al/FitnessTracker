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

  const todayStr = new Date().toLocaleDateString();
  const todayWorkouts = workouts.filter(w => new Date(w.date).toLocaleDateString() === todayStr);

  const totalCalories = workouts.reduce((sum, w) => sum + (w.calories || 0), 0);
  const totalMinutes = workouts.reduce((sum, w) => sum + (w.duration || 0), 0);
  const dailyMinutes = todayWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0);
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const weeklyWorkouts = workouts.filter(w => new Date(w.date) > oneWeekAgo);
  const weeklyMinutes = weeklyWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0);
  const avgDuration = workouts.length > 0 ? Math.round(totalMinutes / workouts.length) : 0;

  const weeklyGoal = 300;
  const dailyGoal = 60;
  const weeklyProgress = Math.min((weeklyMinutes / weeklyGoal) * 100, 100);
  const dailyProgress = Math.min((dailyMinutes / dailyGoal) * 100, 100);


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
    <SafeAreaView className="bg-surface-900 mt-15 flex-1 p-container overflow-auto">
      <View className="bg-primary p-6 rounded-card mb-4">
        <Text className="text-secondary font-heading text-sm uppercase">Weekly Progress</Text>
        <Text className="text-secondary font-heading text-4xl mt-1">{totalMinutes} <Text className="text-xl">mins</Text></Text>
        <View className="h-1.5 bg-secondary/20 rounded-full mt-4 overflow-hidden">
          <View
            className="h-full bg-secondary rounded-full"
            style={{ width: `${weeklyProgress}%` }}
          />
        </View>
      </View>
      <View className="flex-row space-x-3 mb-6 gap-3">
        <View className="flex-1 bg-surface-800 p-4 rounded-card border border-gray-800 items-center">
          <Ionicons name="flame" size={20} color="#CCFF00" />
          <Text className="text-surface-50 font-heading text-lg mt-1">{totalCalories}</Text>
          <Text className="color-white text-[10px] uppercase">Calories</Text>
        </View>
        <View className="flex-1 bg-surface-800 p-4 rounded-card border border-gray-800 items-center">
          <Ionicons name="timer" size={20} color="#CCFF00" />
          <Text className="text-surface-50 font-heading text-lg mt-1">{avgDuration}m</Text>
          <Text className="color-white text-[10px] uppercase">Avg Session</Text>
        </View>
        <View className="flex-1 bg-surface-800 p-4 rounded-card border border-gray-800 items-center">
          <Ionicons name="trophy" size={20} color="#CCFF00" />
          <Text className="text-surface-50 font-heading text-lg mt-1">{workouts.length}</Text>
          <Text className="color-white text-[10px] uppercase">Workouts</Text>
        </View>
      </View>


      <View className="bg-surface-800 p-6 rounded-card mb-6 border border-gray-800">
        <Text className="text-primary font-heading text-sm uppercase">Daily Goal</Text>
        <Text className="text-surface-50 font-heading text-4xl mt-1">{dailyMinutes} <Text className="text-xl">/ {dailyGoal} mins</Text></Text>
        <View className="h-1.5 bg-gray-700 rounded-full mt-4 overflow-hidden">
          <View
            className="h-full bg-primary rounded-full"
            style={{ width: `${dailyProgress}%` }}
          />
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
            <Text className="bg-surface-800 p-3 rounded-card color-white text-center font-body mt-10">No workouts recorded yet. Get moving!</Text>
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