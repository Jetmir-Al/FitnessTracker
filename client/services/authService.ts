import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    deleteUser
} from "firebase/auth";
import { auth } from "./firebase";

export const signUp = async (email: string, pass: string) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, pass);
        return { user: res.user, error: null };
    } catch (err: any) {
        return { user: null, error: err.message };
    }
};

export const logIn = async (email: string, pass: string) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, pass);
        return { user: res.user, error: null };
    } catch (err: any) {
        return { user: null, error: err.message };
    }
};
export const logOut = async () => {
    try {
        await firebaseSignOut(auth);
        return { success: true };
    } catch (err: any) {
        return { success: false, error: err.message };
    }
};

export const deleteAccount = async () => {
    const user = auth.currentUser;
    if (!user) return { success: false, error: "No user found" };

    try {
        await deleteUser(user);
        return { success: true };
    } catch (err: any) {
        return { success: false, error: err.message };
    }
};