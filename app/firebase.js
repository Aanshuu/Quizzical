// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported} from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_HK53ncQHv4fYupIVZAIQx33hfDdPmOc",
  authDomain: "quizzical-65a72.firebaseapp.com",
  projectId: "quizzical-65a72",
  storageBucket: "quizzical-65a72.appspot.com",
  messagingSenderId: "909645400358",
  appId: "1:909645400358:web:c10cce19f848d50c77d9e7",
  measurementId: "G-RVMTPXBH21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
if (typeof window !== 'undefined') {
  isSupported().then(supported => {
    if (supported) {
      getAnalytics(app);
    } else {
      console.log('Analytics not supported');
    }
  });
}

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