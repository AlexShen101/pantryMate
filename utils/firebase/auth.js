import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
} from "firebase/auth";

import { auth } from "./clientApp";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const db = getFirestore();

export function onAuthStateChanged(cb) {
        return _onAuthStateChanged(auth, cb);
}

const createUser = async (userId, email, name, photoUrl) => {
  try {
    const userRef = doc(db, "users", userId);

    await setDoc(userRef, {
      username: name,
      email: email,
    });
  } catch (error) {
    console.error("Error storing user data", error);
  }
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userId = user.uid;
    const email = user.email;
    const name = user.displayName;
    const photoUrl = user.photoURL;

    // check if user already exists in db
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef)

    if (!userSnap.exists()) {
      // create new user
      await createUser(userId, email, name, photoUrl);
    } else {
      console.log("User already exists in db");
    }
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

export async function signOut() {
  try {
    return auth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}

