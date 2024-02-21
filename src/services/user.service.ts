import { addDoc, collection, getDocs, getFirestore, DocumentData } from "firebase/firestore";
import { storageService } from "./async.storage.service";

// Define the User interface
export interface User {
    _id: string;
    phoneNumber: string;
    isAdmin: boolean;
}

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
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
            _id: userData.id,
            phoneNumber: userData.phoneNumber,
            isAdmin: userData.isAdmin
        }));
        return users;
    } catch (error) {
        throw new Error('An error occurred while getting users');
    }
}


async function getById(userId: string): Promise<User | null> {
    const user = await storageService.get('user', userId)
    return user as User; // Assuming the retrieved data is already of type User
}

function remove(userId: string): Promise<void> {
    return storageService.remove('user', userId)
}

async function update({ _id, score }: { _id: string, score: number }) {
    const user = await storageService.get('user', _id)
    await storageService.put('user', user)
    if (getLoggedinUser()?._id === user._id) saveLocalUser(user)
    return user as User; // Assuming the retrieved data is already of type User
}

async function login(phoneNumber: string): Promise<User | undefined> {
    try {
        const usersCollection = 'users';
        const querySnapshot = await getDocs(collection(getFirestore(), usersCollection));
        let user: User | undefined;
        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            if (userData.phoneNumber === phoneNumber) {
                user = {
                    _id: doc.id,
                    phoneNumber: userData.phoneNumber,
                    isAdmin: userData.isAdmin
                };
                saveLocalUser(user); // Save the user to local storage
                return;
            }
        });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        console.error('Login failed: ', error);
        throw new Error('Login failed');
    }
}

async function signup(phoneNumber: string): Promise<User | undefined> {
    try {
        const usersCollection = 'users';
        const newUser = {
            phoneNumber,
            isAdmin: false
        };
        const docRef = await addDoc(collection(getFirestore(), usersCollection), newUser);
        const user: User = {
            _id: docRef.id,
            phoneNumber,
            isAdmin: false
        };
        saveLocalUser(user); // Save the user to local storage
        return user;
    } catch (error) {
        console.error('Signup failed: ', error);
        throw new Error('Signup failed');
    }
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function saveLocalUser(user: User): void {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
}

function getLoggedinUser(): User | null {
    const userString = sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER)
    return userString ? JSON.parse(userString) as User : null;
}
