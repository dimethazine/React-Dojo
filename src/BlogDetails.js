import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import BlogList from "./BlogList";
import { useNavigate } from "react-router-dom";

const deleteButton = (id) => {
  fetch("http://localhost:8000/blogs" + id, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
};
const BlogDetails = () => {
  const history = useNavigate();
  const { id } = useParams();
  const {
    data: blog,
    error,
    isPending,
  } = useFetch("http://localhost:8000/blogs/" + id);
  // console.log(blogs);

  const handleClick = () => {
    fetch("http://localhost:8000/blogs/" + blog.id, { method: "DELETE" }).then(
      () => {
        history(-1);
      }
    );
  };
  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article classList="blog-details">
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={handleClick}>Delete</button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
