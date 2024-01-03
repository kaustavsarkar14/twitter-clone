import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDVDcpCteGZHpQty_bomohswifCTXjVsUE",
  authDomain: "twitter-clone-a6c28.firebaseapp.com",
  projectId: "twitter-clone-a6c28",
  storageBucket: "twitter-clone-a6c28.appspot.com",
  messagingSenderId: "637852263414",
  appId: "1:637852263414:web:3f86502029574fbbdb9dd7",
};

const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage();