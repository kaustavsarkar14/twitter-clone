import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LoadingSpinner from "./LoadingSpinner";
import Toast from "./Toast";
import toast from "react-hot-toast";
import LoadProfileImage from "./LoadProfileImage";

const PostTweet = () => {
  const [title, setTitle] = useState("");
  const [uploadedImageURL, setUploadedImageURL] = useState(null);
  const [uploadedImageDimensions, setUploadedImageDimensions] = useState({
    height: 0,
    width: 0,
  });
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const handleImageUpload = async (e) => {
    setIsImageUploading(true);
    const file = e.target.files[0];

    // Create a URL for the file
    const fileURL = URL.createObjectURL(file);

    // Create an Image object
    const img = new Image();
    img.onload = async () => {
      // Now the image is loaded, you can access naturalHeight

      setUploadedImageDimensions({
        height: img.naturalHeight,
        width: img.naturalWidth,
      });
      // Continue with file upload
      const fileName = `${Date.now()}-${file.name}`;
      const storageRef = ref(storage, fileName);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setUploadedImageURL(downloadURL);
      setIsImageUploading(false);

      // Revoke the created URL to avoid memory leaks
      URL.revokeObjectURL(fileURL);
    };
    // Set the src to the created URL
    img.src = fileURL;
  };
  const handlePost = async () => {
    setIsPosting(true);
    const docRef = await addDoc(collection(db, "posts"), {
      title: title,
      imageURL: uploadedImageURL,
      height: uploadedImageDimensions.height,
      width:uploadedImageDimensions.width,
      createdAt: new Date(),
      authorUID: auth.currentUser.uid,
      authorPhotoURL: auth.currentUser.photoURL,
      authorName: auth.currentUser.displayName,
    });
    await addDoc(collection(db, "stats"), {
      tweetId: docRef.id,
      likes: [],
      retweets: [],
      comments: [],
    });
    setTitle("");
    setUploadedImageURL(null);
    setIsPosting(false);
    toast.success("Your post was sent!!");
  };
  return (
    <div className="flex gap-2 p-3 border-b border-gray-800 mt-2">
      <Toast />
      <LoadProfileImage imgURL={auth?.currentUser?.photoURL} />
      <div className="flex flex-col w-full gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What is happening?!"
          className="bg-black text-xl placeholder:text-gray-600 outline-none"
        />
        {(uploadedImageURL || isImageUploading) && (
          <div className="h-20 w-20 relative">
            {isImageUploading ? (
              <div>
                <LoadingSpinner />
              </div>
            ) : (
              <>
                <div
                  onClick={() => setUploadedImageURL(null)}
                  className="absolute right-1 top-1 bg-black rounded-full bg-opacity-80"
                >
                  <CloseRoundedIcon />
                </div>
                <img
                  className="object-cover w-full h-full rounded-xl"
                  src={uploadedImageURL}
                />
              </>
            )}
          </div>
        )}
        <div className="flex justify-between">
          <label htmlFor="fileInput">
            <BrokenImageOutlinedIcon sx={{ color: "#3B82F6" }} />
          </label>
          <input
            id="fileInput"
            className="hidden"
            type="file"
            accept="image/jpeg, image/png, image/gif, image/webp, text/html"
            onChange={handleImageUpload}
          />
          <button
            onClick={handlePost}
            className="bg-blue-500 rounded-full py-2 font-bold px-5 disabled:opacity-50"
            disabled={(!uploadedImageURL && title == "") || isPosting}
          >
            {isPosting ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostTweet;
