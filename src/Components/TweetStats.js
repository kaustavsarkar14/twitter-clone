import React, { useEffect, useState } from "react";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import SyncRoundedIcon from "@mui/icons-material/SyncRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";

const TweetStats = ({ tweetData, tweetId }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [retweetCount, setRetweetCount] = useState(0);
  const [isRetweeted, setIsRetweeted] = useState(false);

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
        setRetweetCount(data.retweets.length);
        if (data.likes.includes(auth.currentUser.uid)) setIsLiked(true);
        if (data.retweets.includes(auth.currentUser.uid)) setIsRetweeted(true);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  const retweetTweet = async () => {
    setIsRetweeted(true);
    try {
      const querySnapshot = await getDocs(q);
      const tweetStatsDoc = querySnapshot.docs[0];
      const retweets = tweetStatsDoc.data().retweets;
      const tweetDocRef = tweetStatsDoc.ref;
      await updateDoc(tweetDocRef, {
        retweets: [...retweets, auth.currentUser.uid],
      });
      setRetweetCount((count) => count + 1);
      const docRef = await addDoc(collection(db, "posts"), {
        authorName: tweetData.authorName,
        authorPhotoURL: tweetData.authorPhotoURL,
        authorUID: tweetData.authorUID,
        imageURL: tweetData.imageURL,
        title: tweetData.title,
        height: tweetData.height,
        width: tweetData.width,
        isRetweet: true,
        retweeterUID: auth.currentUser.uid,
        retweeterName: auth.currentUser.displayName,
        createdAt: new Date(),
        mainTweetId: tweetData.id,
      });
      await addDoc(collection(db, "stats"), {
        tweetId: docRef.id,
        likes: [],
        retweets: [auth.currentUser.uid],
        comments: [],
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      setRetweetCount(false);
    }
  };
  const undoRetweet = async () => {
    setIsRetweeted(false);
    try {
      const querySnapshot = await getDocs(q);
      const tweetStatsDoc = querySnapshot.docs[0];
      const retweets = tweetStatsDoc.data().retweets;
      const tweetDocRef = tweetStatsDoc.ref;
      await updateDoc(tweetDocRef, {
        retweets: retweets.filter((id) => id != auth.currentUser.uid),
      });
      const retweetsQuery = query(
        collection(db, "posts"),
        where("retweeterUID", "==", auth.currentUser.uid),
        where("mainTweetId", "==", tweetData.id)
      );
      const retweetsSnapshot = await getDocs(retweetsQuery);
      retweetsSnapshot.forEach((doc) => {
        deleteDoc(doc.ref)
      });

      setRetweetCount((count) => count - 1);
    } catch (error) {
      console.error("Error updating profile:", error);
      setIsRetweeted(true);
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
      setIsLiked(false);
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
      setIsLiked(true);
    }
  };
  return (
    <div className="w-[80%] flex justify-between py-1 text-gray-500">
      <ChatBubbleOutlineRoundedIcon />
      <div className="flex gap-1">
        {retweetCount > 0 && retweetCount}
        {isRetweeted ? (
          <SyncRoundedIcon
            sx={{ color: "#00BA7C", cursor: "pointer" }}
            onClick={undoRetweet}
          />
        ) : (
          <SyncRoundedIcon sx={{ cursor: "pointer" }} onClick={retweetTweet} />
        )}
      </div>
      <div className="flex gap-1">
        <p>{likeCount > 0 && likeCount}</p>
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
