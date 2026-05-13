import AsyncStorage from "@react-native-async-storage/async-storage";
import { db, auth } from "./firebase";
import { collection, addDoc, query, orderBy, getDocs, limit } from "firebase/firestore";

export interface Workout {
    id: string;
    type: string;
    duration: number;
    calories: number;
    date: string;
}

export const saveWorkout = async (workout: Omit<Workout, 'id'>) => {
    const newWorkout = { ...workout, id: Date.now().toString() };

    try {
        const existingData = await AsyncStorage.getItem("local_workouts");
        const workouts = existingData ? JSON.parse(existingData) : [];
        workouts.push(newWorkout);
        await AsyncStorage.setItem("local_workouts", JSON.stringify(workouts));

        if (auth.currentUser) {
            await addDoc(collection(db, "users", auth.currentUser.uid, "workouts"), newWorkout);
            console.log("Synced to Firebase!");
        }

        return { success: true, local: true, synced: !!auth.currentUser };
    } catch (error) {
        console.error("Error saving workout:", error);
        return { success: false };
    }
};

export const getRecentWorkouts = async () => {
    const user = auth.currentUser;
    if (!user) return [];

    try {
        const q = query(
            collection(db, "users", user.uid, "workouts"),
            orderBy("date", "desc"),
            limit(5)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Workout[];
    } catch (error) {
        console.error("Error fetching workouts:", error);
        return [];
    }
};