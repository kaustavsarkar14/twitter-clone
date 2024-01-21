import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, db, provider } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { APPLE_LOGO, GOOGLE_LOGO, LOGO_URL } from "../utils/constants";

const Login = () => {
  const handleSignUpWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    const uid = result.user.uid;

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "==", uid));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
      } else {
        console.log("No user found with the UID:", uid);
        const docRef = await addDoc(usersRef, {
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          bannerURL: null,
          bio: "",
          uid: uid,
        });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
    try {
      await addDoc(collection(db, "follow"), {
        userId: auth.currentUser.uid,
        followers: [],
        following: [],
      });
    } catch (err) {}
  };
  return (
    <div className="flex flex-col md:flex-row h-[90vh] m-auto justify-center">
      <div className="md:w-[55%] w-full flex md:justify-center justify-start p-4 md:mb-0 mb-10 items-center">
        <img src={LOGO_URL} className="md:h-[50vh] h-[4rem]" alt="" />
      </div>
      <div className="md:w-[45%] w-full p-4 flex flex-col justify-center">
        <h1 className="md:text-6xl text-5xl font-bold mb-12">Happening now</h1>
        <h2 className="text-3xl font-bold my-6">Join today</h2>
        <div className="flex flex-col gap-2 md:justify-start md:items-start justify-center items-center">
          <button
            className="bg-white text-black flex gap-2 rounded-full py-2 w-full md:w-[20rem] justify-center items-center"
            onClick={handleSignUpWithGoogle}
          >
            <img src={GOOGLE_LOGO} className="h-6 w-6" alt="" />
            <p className="font-semibold">Sign in With Google</p>
          </button>
          <button
            className="bg-white text-black flex gap-2 rounded-full py-2 w-full md:w-[20rem] justify-center items-center"
            onClick={handleSignUpWithGoogle}
          >
            <img src={APPLE_LOGO} className="w-5" alt="" />
            <p className="font-bold">Sign in With Apple</p>
          </button>
          <h1 className="font-semibold pl-2 my-3">Already have and account?</h1>
          <button
            className="bg-blue-500 flex gap-2 rounded-full py-2 w-full md:w-[20rem] justify-center items-center"
            onClick={handleSignUpWithGoogle}
          >
            <p className="font-bold">Sign in</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
