import {ref, set, get, child, getDatabase} from "firebase/database";  // Adjust the import based on your firebase setup
import bcrypt from 'bcryptjs';
import {v4 as uuidv4} from 'uuid';
const db = getDatabase();

export const registerUser = async ({ firstName, lastName, email, password}) => {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, `users`));
    const users = snapshot.exists() ? snapshot.val() : {};

    
    const emailExists = Object.values(users).some(user => user.email === email);
    if(emailExists){
        throw new Error("Email Already Registered");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    await set(ref(db, `users/${userId}`),{
        id: userId,
        firstName,
        lastName,
        email,
        password: hashedPassword
    });

    return {userId};
}