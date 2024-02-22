import { addDoc, collection, getDocs, getFirestore, DocumentData } from "firebase/firestore";
import { storageService } from "./async.storage.service";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase.config";

// Define the User interface
export interface User {
    id: string;
    email: string;
    password: string
    // isAdmin: boolean;
}

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    // signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    // update,
}

declare global {
    interface Window {
        userService: typeof userService;
    }
}

window.userService = userService;

async function getUsers(): Promise<User[]> {
    try {
        const usersData = await storageService.query('user');
        // Map Firestore document data to User objects
        const users: User[] = usersData.map((userData: DocumentData) => ({
            id: userData.id,
            email: userData.email,
            password: userData.password,
            isAdmin: userData.isAdmin,
        }))
        return users;
    } catch (error) {
        throw new Error('An error occurred while getting users');
    }
}


async function getById(userId: string): Promise<User | null> {
    const user: User = await storageService.get<User>('user', userId)
    return user
}

function remove(userId: string): Promise<void> {
    return storageService.remove('user', userId)
}

// async function update({ _id, score }: { _id: string, score: number }) {
//     const user = await storageService.get('user', _id)
//     await storageService.put('user', user)
//     if (getLoggedinUser()?.id === user.id) saveLocalUser(user)
//     return user as User; // Assuming the retrieved data is already of type User
// }

async function login(email: string, password: string): Promise<void> {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)

        console.log(userCredential.user)
        const newUser: User = {
            id: userCredential.user.uid,
            email: userCredential.user.email!,
            password: '',
        }

        saveLocalUser(newUser)
    } catch (error) {
        console.error(error)
    }
}

// async function signup(phoneNumber: string): Promise<User | undefined> {
//     try {
//         const usersCollection = 'users';
//         const newUser = {
//             email,
//             password,
//             isAdmin: false
//         };
//         const docRef = await addDoc(collection(getFirestore(), usersCollection), newUser);
//         const user: User = {
//             id: docRef.id,
//             email,
//             password,
//             isAdmin: false
//         };
//         saveLocalUser(user); // Save the user to local storage
//         return user;
//     } catch (error) {
//         console.error('Signup failed: ', error);
//         throw new Error('Signup failed');
//     }
// }

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function saveLocalUser(user: User): void {
    console.log('saveLocalUser  user:', user)
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
}

function getLoggedinUser(): User | null {
    const userString = sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER)
    return userString ? JSON.parse(userString) as User : null;
}
