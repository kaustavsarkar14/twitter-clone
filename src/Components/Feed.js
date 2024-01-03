import React from "react";
import { useSelector } from "react-redux";
import Tweet from "./Tweet";
import PostTweet from "./PostTweet";
import LoadingSpinner from "./LoadingSpinner";

const Feed = () => {
  const { allPosts, isPostsLoading } = useSelector((state) => state.posts);
  console.log(allPosts);
  return (
    <div className="w-[40%] border-l border-r border-gray-800">
      <PostTweet />
      {isPostsLoading ? (
        <div className="flex justify-center pt-3" >
        <LoadingSpinner />
        </div>
      ) : (
        <div>
          {allPosts.map((post) => (
            <Tweet key={post.id} tweetData={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;
