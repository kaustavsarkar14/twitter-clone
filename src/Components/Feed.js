import React from "react";
import { useSelector } from "react-redux";
import Tweet from "./Tweet";
import PostTweet from "./PostTweet";

const Feed = () => {
  const allPosts = useSelector((state) => state.posts.allPosts);
  console.log(allPosts);
  return (
    <div className="w-[40%] border-l border-r border-gray-800">
      <PostTweet />
      <div>
        {allPosts.map((post) => (
          <Tweet key={post.id} tweetData={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
