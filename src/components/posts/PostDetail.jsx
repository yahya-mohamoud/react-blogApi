import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "../../styles/postDetails.css"
function PostDetail() {
    const token = localStorage.getItem("token")
    const [post, setPost] = useState(null)
    const [error, setError] = useState('')
    const { id } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:3030/api/posts/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                })
                const data = await res.json()
                if (!res.ok) {
                    setError(data.message || 'failed to fetch post')
                    return
                }
                setPost(data)
            } catch (err) {
                setError("Something went wrong")
                console.error(err)
            }
        }
        fetchData()
    }, [id, token])

    if(!post) return 
    // console.log(post)

    const edited = post.content.split(". ")
    // console.log(edited)
    const para = edited.map((p, index) => {
        return <p key={index}>{index}  {p}</p>
    });
    return (

            <section className="post-details">
            <div className="avatar">
                <h3>by {post.username} || Guest</h3>
            </div>
            <h1 className="post-title">{post.title}</h1>
            <img src={post.imageUrl} alt={post.title} className="post-img" />
            <div className="post-content">
            <p className="content">{post.content}</p>
            <br />
            <hr />
            <br />
            <p>comments will follow here...</p>
            {post.comments > 0 && post.comments.map(c => {
                <div className="comment">
                    <p>{c.content}</p>
                    <button>Like</button>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            })}
            </div>
            </section>
    )
}

export default PostDetail