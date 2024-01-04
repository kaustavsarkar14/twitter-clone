import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import Tweet from "./Tweet";
import LoadingSpinner from "./LoadingSpinner";

const OwnTweets = () => {
  const { userId } = useParams();
  const [ownTweets, setOwnTweets] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    fetchOwnTweets();
  }, []);
  const fetchOwnTweets = async () => {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, where("authorUID", "==", userId), orderBy("createdAt", "desc"));

    try {
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id}));
      setOwnTweets(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
    setLoading(false);
  };
  return (
    <div>
      {isLoading?
      <div className="w-full h-screen flex justify-center items-center" >
      <LoadingSpinner/>
      </div>
      :
      ownTweets.map((tweetData) => (
        <Tweet key={tweetData.id} tweetData={tweetData} />
      ))}
    </div>
  );
};

export default OwnTweets;
