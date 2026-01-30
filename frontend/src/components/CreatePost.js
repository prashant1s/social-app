import { useState } from "react";
import API from "../api";

export default function CreatePost({ onCreated }) {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const submit = async () => {
    if (!text && !imageUrl) {
      alert("Add text or image");
      return;
    }
    await API.post("/posts", { text, imageUrl });
    setText("");
    setImageUrl("");
    onCreated();
  };

  return (
    <div className="card">
      <textarea placeholder="Write something..."
                value={text}
                onChange={e => setText(e.target.value)} />
      <input placeholder="Image URL (optional)"
             value={imageUrl}
             onChange={e => setImageUrl(e.target.value)} />
      {/* <button onClick={submit}>Post</button> */}
      <button onClick={submit} type="button" class="btn btn-info">Post</button>
    </div>
  );
}
