import API from "../api";

export default function PostCard({ post, refresh }) {
  const like = async () => {
    await API.post(`/posts/${post._id}/like`);
    refresh();
  };

  const comment = async () => {
    const text = prompt("Comment:");
    if (!text) return;
    await API.post(`/posts/${post._id}/comment`, { text });
    refresh();
  };

  return (
    <div className="">
     

      <h4 className="">
         <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        className="me-2"
        viewBox="0 0 16 16"
      >
        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
      </svg>
        {post.authorUsername}</h4>
      {/* </div> */}
      {post.text && <p>{post.text}</p>}
      {post.imageUrl && <img src={post.imageUrl} alt="" />}

      <div className="d-flex gap-2 mb-2">
        {/* <button onClick={like}> </button> */}
        <button onClick={like} type="button" class="btn btn-primary">
          Like({post.likes.length})
        </button>
        {/* <button onClick={comment}>Comment ({post.comments.length})</button> */}
        <button type="button" class="btn btn-primary" onClick={comment}>
          Comment ({post.comments.length})
        </button>
      </div>

      <small>Liked by: {post.likes.map((l) => l.username).join(", ")}</small>
      <br />
      <small>
        Commented by: {post.comments.map((c) => c.username).join(", ")}
      </small>
    </div>
  );
}
