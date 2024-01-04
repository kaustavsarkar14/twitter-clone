import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, db, provider } from "../firebase";
import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

const Login = () => {
  const handleSignUpWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    const uid = result.user.uid;

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "==", uid));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        console.log(querySnapshot)
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          // Process the data as needed
        });
      } else {
        console.log("No user found with the UID:", uid);
        const docRef = await addDoc(usersRef, {
          name:result.user.displayName,
          email: result.user.email,
          photoURL:result.user.photoURL,
          bannerURL:null,
          bio:'',
          followers:0,
          following:0,
          uid: uid,
        });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }

  };
  return (
    <div>
      <button className="bg-blue-400" onClick={handleSignUpWithGoogle}>
        Sign in With Google
      </button>
    </div>
  );
};

export default Login;
