import React, { useEffect, useState } from "react";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import SyncRoundedIcon from "@mui/icons-material/SyncRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";

const TweetStats = ({ tweetId }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const statsRef = collection(db, "stats");
  const q = query(statsRef, where("tweetId", "==", tweetId));

  useEffect(() => {
    fetchStats();
  }, []);
  const fetchStats = async () => {
    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs[0]) {
        const data = querySnapshot.docs[0].data();
        setLikeCount(data.likes.length);
        if (data.likes.includes(auth.currentUser.uid)) setIsLiked(true);
        console.log(data);
      } else {
        addDoc(collection(db, "stats"), {
          tweetId:tweetId,
          likes: [],
        });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  const likeTweet = async () => {
    setIsLiked(true);
    try {
      const querySnapshot = await getDocs(q);
      const tweetStatsDoc = querySnapshot.docs[0];
      const likes = tweetStatsDoc.data().likes;
      const tweetDocRef = tweetStatsDoc.ref;
      await updateDoc(tweetDocRef, { likes: [...likes, auth.currentUser.uid] });
      setLikeCount((likeCount) => likeCount + 1);
    } catch (error) {
      console.error("Error updating profile:", error);
      setIsLiked(false)
    }
  };
  const unlikeTweet = async () => {
    setIsLiked(false);
    try {
      const querySnapshot = await getDocs(q);
      const tweetStatsDoc = querySnapshot.docs[0];
      const likes = tweetStatsDoc.data().likes;
      const tweetDocRef = tweetStatsDoc.ref;
      await updateDoc(tweetDocRef, {
        likes: likes.filter((id) => id != auth.currentUser.uid),
      });
      setLikeCount((likeCount) => likeCount - 1);
    } catch (error) {
      console.error("Error updating profile:", error);
      setIsLiked(true)
    }
  };
  return (
    <div className="w-[80%] flex justify-between py-1 text-gray-500">
      <ChatBubbleOutlineRoundedIcon />
      <SyncRoundedIcon />
      <div className="flex gap-1">
        <p>{likeCount>0 && likeCount}</p>
        {isLiked ? (
          <FavoriteRoundedIcon
            sx={{ color: "#F91880", cursor: "pointer" }}
            onClick={unlikeTweet}
          />
        ) : (
          <FavoriteBorderRoundedIcon
            onClick={likeTweet}
            sx={{ cursor: "pointer", "&:hover": { color: "#F91880" } }}
          />
        )}
      </div>
    </div>
  );
};

export default TweetStats;
