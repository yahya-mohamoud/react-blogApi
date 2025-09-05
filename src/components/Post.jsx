import { useEffect, useState } from "react"
import  '../styles/posts.css'
function Post() {
    const [posts, setPosts] = useState([])
    const token = localStorage.getItem("token")

    useEffect(() => {
        if(!token) return;

        fetch("http://localhost:3030/api/posts", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then((res) => res.json())
        .then((data) => setPosts(data))
        .catch((err) => console.error(err))

    }, [token])
  return (
    <div>
      <h1>Posts</h1>
      {posts.map((p) => (
        <div key={p.id}>
            {p.title}
            {p.comments.map(c => {
                return <p key={c.id}>{c.content} </p>
            })}
        </div>
       
      ))}
    </div>
  )
}

export default Post