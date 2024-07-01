// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Initialize Firestore and get a reference to the service
const db = getFirestore(app);

// Export Firebase services for use in other parts of your app
export { auth, provider, signInWithPopup, signOut, db, collection, addDoc, getDocs, query, where };

// Function to save score to Firestore
export const saveScore = async (userId, score) => {
  try {
    await addDoc(collection(db, "scores"), {
      userId,
      score,
      createdAt: new Date()
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Function to get scores from Firestore
export const getScores = async (userId) => {
  const q = query(collection(db, "scores"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  const scores = [];
  querySnapshot.forEach((doc) => {
    scores.push(doc.data().score);
  });
  return scores;
};
// Function to sign out
export const signOutUser = async () => {
  try {
    await firebaseSignOut(auth);
    console.log("User signed out");
  } catch (e) {
    console.error("Error signing out: ", e);
  }
};