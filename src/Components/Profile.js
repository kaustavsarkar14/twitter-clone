import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebase";

const Profile = () => {
  const { userId } = useParams();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "==", userId));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        console.log(doc.id, " => ", doc.data());
        setProfileData(doc.data());
      } else {
        console.log("No user found with the UID:", userId);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  return (
    <div className='"w-screen md:w-[40%] border-l border-r border-gray-800'>
      <div className="flex flex-col">
        <div className="bg-gray-800 h-48">
          {profileData && (
            <img
              src={profileData.bannerURL}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="relative border-b border-gray-800 -mt-16 p-3 pb-6">
          {profileData && (
            <>
              <div className="flex justify-between items-end mb-3">
                <img
                  src={profileData.photoURL}
                  className="rounded-full shadow-2xl w-32"
                  alt=""
                />
                {profileData.uid == auth.currentUser.uid && (
                  <button className="font-bold border border-white py-1 px-2 rounded-full mb-10">
                    Edit Profile
                  </button>
                )}
              </div>
              <h1 className="font-bold">{profileData.name}</h1>
              <h3 className="opacity-55 mb-3" >@{profileData.email.split("@")[0]}</h3>
              <p>{profileData.bio}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
