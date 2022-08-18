import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("mario");
  const [isPending, setIsPending] = useState(false);
  const history = useNavigate();

  // Submit button
  const handleSubmit = (e) => {
    e.preventDefault(); // stops the page from refreshing when clicking the add blog button
    //let blog = new Object(); // Basic method to create an object
    const blog = { title: title, body: body, author }; // main way of creating object - two methods used
    //blog.title = title; // basic method to create objects
    //blog.body = body; // basic method to create objects
    //blog.author = author; // basic method to create objects

    setIsPending(true);

    // Post request
    fetch("http://localhost:8000/blogs", {
      // Grab the database to which we're posting to
      method: "POST", // Method is POST, but can be anything: GET POST PUT DELETE (etc)
      headers: { "Content-Type": "application/json" }, // This is the same from what I can tell in all of them
      body: JSON.stringify(blog), // This is what to post - Have to use stringify with JSON - json.stringify(object/variable/etc)
    }).then(() => {
      // After the first part has ran
      console.log("New blog added");
      console.log(blog);
      history("/");
      setIsPending(false);
    });
  };

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
          required
          body={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog author:</label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="Brooke">Brookieeee</option>
          <option value="Roy">Royieeee</option>
        </select>

        {!isPending && <button>Add Blog</button>}
        {isPending && <button disabled>Adding Blog...</button>}
      </form>
    </div>
  );
};

export default Create;
