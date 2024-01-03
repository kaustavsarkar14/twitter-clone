import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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
      authorUID : auth.currentUser.uid
    });
  };
  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What is happening?!"
        className="border
      "
      />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button
        onClick={handlePost}
        className="bg-blue-600 px-3 py-2 rounded-md disabled:bg-blue-200"
        disabled={!file && title == ""}
      >
        Tweet
      </button>
    </div>
  );
};

export default PostTweet;
