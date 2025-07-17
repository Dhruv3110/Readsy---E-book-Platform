// src/utils/loginUser.js
import { ref, get } from "firebase/database";
import { db } from "../firebase"; 
import bcrypt from "bcryptjs";

export const loginUser = async ({ email, password }) => {
  const usersRef = ref(db, 'users');
  const snapshot = await get(usersRef);

  if (!snapshot.exists()) throw new Error("No users found.");

  const users = snapshot.val();
  const matchedUser = Object.values(users).find((user) => user.email === email);

  if (!matchedUser) throw new Error("User with this email does not exist.");

  const isPasswordCorrect = await bcrypt.compare(password, matchedUser.password);
  if (!isPasswordCorrect) throw new Error("Incorrect password.");

  return matchedUser;
};
