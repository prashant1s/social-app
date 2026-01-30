import { useEffect, useState } from "react";
import API from "../api";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    const res = await API.get("/api/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location = "/api/login";
  };

  return (
    <div className="app-wrapper">
      {/* <button onClick={logout}>Logout</button> */}
      <button onClick={logout} type="button" class="btn btn-danger">Logout</button>
      <CreatePost onCreated={loadPosts} />
      {posts.map(p => (
        <PostCard key={p._id} post={p} refresh={loadPosts} />
      ))}
    </div>
  );
}
