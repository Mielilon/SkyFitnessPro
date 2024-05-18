import { ref } from "firebase/database";
import app, { database } from "./firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(app);
export async function signUp(email, password) {
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
    const usersDB = ref(database, 'users');

  } catch (e) {
    error = e;
  }

  return { result, error };
}

