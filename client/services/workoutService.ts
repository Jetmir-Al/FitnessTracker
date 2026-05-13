import AsyncStorage from "@react-native-async-storage/async-storage";
import { db, auth } from "./firebase";
import { collection, addDoc, query, orderBy, getDocs, limit, where } from "firebase/firestore";
import { Alert } from "react-native";

export interface Workout {
    id: string;
    type: string;
    duration: number;
    calories: number;
    date: string;
    synced?: boolean;
}

export const saveWorkout = async (workout: Omit<Workout, 'id'>) => {
    const newWorkout = { ...workout, id: Date.now().toString() };

    try {
        const existingData = await AsyncStorage.getItem("local_workouts");
        const workouts = existingData ? JSON.parse(existingData) : [];
        workouts.push(newWorkout);
        await AsyncStorage.setItem("local_workouts", JSON.stringify(workouts));

        if (auth.currentUser) {
            addDoc(collection(db, "users", auth.currentUser.uid, "workouts"), {
                ...newWorkout,
                synced: true
            })
                .then(() => console.log("Cloud sync finished!"))
                .catch((err) => console.log("Cloud sync failed (will retry next launch/sync):", err));

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
            limit(50)
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

export const getExerciseHistory = async (exerciseType: string) => {
    const user = auth.currentUser;
    if (!user) return [];

    try {
        const q = query(
            collection(db, "users", user.uid, "workouts"),
            where("type", "==", exerciseType),
            orderBy("date", "desc")
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Workout[];
    } catch (error) {
        console.error("Error fetching exercise history:", error);
        return [];
    }
};

export const syncOfflineWorkouts = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
        const localData = await AsyncStorage.getItem("local_workouts");
        if (!localData) return;

        let workouts: Workout[] = JSON.parse(localData);

        const unsynced = workouts.filter(w => !w.synced);

        if (unsynced.length === 0) return;

        for (const workout of unsynced) {
            await addDoc(collection(db, "users", user.uid, "workouts"), {
                ...workout,
                synced: true
            });

            workout.synced = true;
        }

        await AsyncStorage.setItem("local_workouts", JSON.stringify(workouts));

        Alert.alert("Sync Complete", "New workouts have been uploaded! ");
    } catch (error) {
        console.error("Sync failed:", error);
    }
};

export const getAllWorkouts = async () => {
    const user = auth.currentUser;
    if (!user) return [];

    try {
        const q = query(
            collection(db, "users", user.uid, "workouts"),
            orderBy("date", "desc")
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Workout[];
    } catch (error) {
        console.error("Error fetching all workouts:", error);
        return [];
    }
};