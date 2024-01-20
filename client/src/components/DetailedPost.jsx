import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";

function Post() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { postId } = useParams();

  useEffect(() => {
    async function getPost() {
      try {
        const res = await fetch(`http://localhost:5000/api/posts/${postId}`);
        const post = await res.json();
        setPost(post);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    }
    getPost();
  }, [postId]);

  useEffect(() => {
    (async () => {
      let res = await fetch("http://localhost:5000/api/isAuthenticated", {
        credentials: "include",
      });
      res = await res.json();
      setIsAuthenticated(res);
    })();
  });

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("start");

    await fetch("http://localhost:5000/api/comments", {
      method: "POST",
      body: new URLSearchParams(new FormData(e.target)),
      credentials: "include",
    });

    const res = await fetch(`http://localhost:5000/api/posts/${postId}`);
    const post = await res.json();
    setPost(post);
  }

  async function handleClick(comment) {
    await fetch(`http://localhost:5000/api/comments/${comment._id}`, {
      method: "DELETE",
    });

    const res = await fetch(`http://localhost:5000/api/posts/${postId}`);
    const post = await res.json();
    setPost(post);
  }

  return (
    <main>
      {post ? (
        <>
          <section>
            <div className="post detailedPost" key={post._id}>
              <div>
                <span>{post.author.username}</span>
                <span>{post.date}</span>
              </div>
              <h3>{post.title}</h3>
              <div>{post.body}</div>
            </div>
          </section>
          <section>
            {isAuthenticated && (
              <>
                <h3>New comment</h3>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div>
                    <textarea name="body" id="" cols="60" rows="5"></textarea>
                  </div>
                  <input type="text" name="postId" defaultValue={post._id} hidden />
                  <button>New comment</button>
                </form>
              </>
            )}
            {post.comments.length > 0 && (
              <>
                <h1>Comments</h1>
                {post.comments.map((comment) => (
                  <Comment comment={comment} key={comment._id} handleClick={handleClick} />
                ))}
              </>
            )}
          </section>
        </>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
        <p>Post is private or doesn&apos;t exist</p>
      )}
    </main>
  );
}

export default Post;
