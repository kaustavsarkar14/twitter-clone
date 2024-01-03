import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, provider } from "../firebase";

const Login = () => {
  const handleSignUpWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
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
