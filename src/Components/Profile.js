import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import OwnTweets from "./OwnTweets";
import EditProfileModal from "./EditProfileModal";
import { useDispatch } from "react-redux";
import { closeMobileNav } from "../redux/appSlice";

const Profile = () => {
  const { userId } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeMobileNav());
    fetchProfileData();
  }, [userId]);

  const fetchProfileData = async () => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "==", userId));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        setProfileData(doc.data());
      } else {
        console.log("No user found with the UID:", userId);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }

    try {
      const followRef = collection(db, "follow");
      const q = query(followRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const doc = querySnapshot.docs[0];
      console.log(doc.data());
      setFollowersCount(doc.data().followers.length);
      setFollowingCount(doc.data().following.length);
    } catch (err) {
      console.log(err);
    }

    try {
      const followRef = collection(db, "follow");
      const userQuery = query(followRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(userQuery);
      const userProfileDoc = querySnapshot.docs[0];
      const userProfileData = userProfileDoc.data();
      if (userProfileData.followers.includes(auth.currentUser.uid))
        setIsFollowing(true);
    } catch (error) {
      console.log(error);
    }
  };

  const followUser = async () => {
    setIsFollowing(true);
    setFollowersCount(followersCount + 1);
    const followRef = collection(db, "follow");
    try {
      const userQuery = query(followRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(userQuery);
      const userProfileDoc = querySnapshot.docs[0];
      const userProfileData = userProfileDoc.data();
      console.log(userProfileData);
      const profileRef = userProfileDoc.ref;
      await updateDoc(profileRef, {
        ...userProfileData,
        followers: [...userProfileData.followers, auth.currentUser.uid],
      });
    } catch (error) {
      console.log(error);
      setIsFollowing(false);
      setFollowersCount(followersCount - 1);
    }
    try {
      const authUserQuery = query(
        followRef,
        where("userId", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(authUserQuery);
      const userProfileDoc = querySnapshot.docs[0];
      const userProfileData = userProfileDoc.data();
      const profileRef = userProfileDoc.ref;
      await updateDoc(profileRef, {
        ...userProfileData,
        following: [...userProfileData.following, userId],
      });
    } catch (error) {
      console.log(error);
      setIsFollowing(false);
      setFollowersCount(followersCount - 1);
    }
  };
  const unFollowUser = async () => {
    setIsFollowing(false);
    setFollowersCount(followersCount - 1);

    const followRef = collection(db, "follow");
    try {
      const userQuery = query(followRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(userQuery);
      const userProfileDoc = querySnapshot.docs[0];
      const userProfileData = userProfileDoc.data();
      console.log(userProfileData);
      const profileRef = userProfileDoc.ref;
      await updateDoc(profileRef, {
        ...userProfileData,
        followers: userProfileData.followers.filter(
          (id) => id != auth.currentUser.uid
        ),
      });
    } catch (error) {
      console.log(error);
      setIsFollowing(true);
      setFollowersCount(followersCount + 1);
    }
    try {
      const authUserQuery = query(
        followRef,
        where("userId", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(authUserQuery);
      const userProfileDoc = querySnapshot.docs[0];
      const userProfileData = userProfileDoc.data();
      const profileRef = userProfileDoc.ref;
      await updateDoc(profileRef, {
        ...userProfileData,
        following: userProfileData.following.filter((id) => id != userId),
      });
    } catch (error) {
      console.log(error);
      setIsFollowing(true);
      setFollowersCount(followersCount + 1);
    }
  };
  return (
    <div className='"w-screen md:w-[40%] border-l border-r border-gray-800'>
      <div className="flex flex-col">
        <div className="bg-gray-800 md:h-48 h-32">
          {profileData?.bannerURL && (
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
                  className="rounded-full shadow-2xl md:w-32 w-20 md:h-32 h-20 object-cover"
                  alt=""
                />
                {profileData.uid == auth.currentUser.uid ? (
                  <EditProfileModal profileData={profileData} />
                ) : isFollowing ? (
                  <button
                    onClick={unFollowUser}
                    className="font-bold border border-white py-1 px-2 rounded-full md:mb-10 -mb-3"
                  >
                    Following
                  </button>
                ) : (
                  <button
                    onClick={followUser}
                    className="font-bold border bg-white text-black border-white py-1 px-2 rounded-full md:mb-10 -mb-3"
                  >
                    Follow
                  </button>
                )}
              </div>
              <h1 className="font-bold">{profileData.name}</h1>
              <h3 className="text-gray-500 mb-3">
                @{profileData.email.split("@")[0]}
              </h3>
              <p>{profileData.bio}</p>
            </>
          )}
          <div className="flex gap-3">
            <p>
              {followingCount} <span className="text-gray-500">Followings</span>
            </p>
            <p>
              {followersCount} <span className="text-gray-500">Followers</span>
            </p>
          </div>
        </div>
      </div>
      <OwnTweets />
    </div>
  );
};

export default Profile;
