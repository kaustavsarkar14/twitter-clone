import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";

const PostTweet = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const handlePost = async () => {
    const fileName = `${Date.now()}-${file.name}`;
    const storageRef = ref(storage, fileName);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    const docRef = await addDoc(collection(db, "posts"), {
      title: title,
      imageURL: downloadURL,
      createdAt: new Date(),
      authorUID: auth.currentUser.uid,
      authorPhotoURL: auth.currentUser.photoURL,
      authorName: auth.currentUser.displayName,
    });
  };
  return (
    <div className="flex gap-2 p-3 border-b border-gray-800 mt-2">
      <img
        src={auth?.currentUser?.photoURL}
        className="h-10 w-10 rounded-full"
        alt=""
      />
      <div className="flex flex-col w-full gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What is happening?!"
          className="bg-black text-xl placeholder:text-gray-600 outline-none"
        />
        <div className="flex justify-between">
          <label htmlFor="xy">
            <BrokenImageOutlinedIcon sx={{color:"#3B82F6"}} />
          </label>
          <input
            id="xy"
            className="hidden"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            onClick={handlePost}
            className="bg-blue-500 rounded-full py-2 font-bold px-5 disabled:opacity-50"
            disabled={!file && title == ""}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostTweet;
