import { useEffect, useState } from "react"
import '../../styles/posts.css'
import { NavLink } from "react-router-dom"

function Post() {
  const [posts, setPosts] = useState([])
  const token = localStorage.getItem("token")
  const [error, setError] = useState("")
  useEffect(() => {

    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3030/api/posts/published", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json"
          }
        })

        const data = await res.json()
        if (!res.ok) {
          setError(data.message || "Failed to fetch Post")
          return
        }
        setPosts(data)
      } catch (err) {
        setError("Something Went Wrong while fetching data")
        return
      }
    }
    fetchData()
  }, [])

  return (
    <>

      <section className="posts-section">
        {posts.length > 0 ? (
          <>
            <h1 className="posts-title">Posts</h1>

            <div className="post-container">
              {posts.map((p) => (
                <div key={p.id} className="post-card">
                  <img src={p.imageUrl} alt={p.title} className="post-image" />
                  <NavLink to={`/posts/${p.id}`} className="post-link"><h2>{p.title}</h2></NavLink>
                </div>

              ))}
            </div>
          </>
  ) : (
<>
     <h2 className="no-posts"> OOPS! There is no published posts</h2>
</>
)}
  </section>
 
    </>
  )
}

export default Post