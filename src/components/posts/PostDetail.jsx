import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "../../styles/postDetails.css"
import image from "../../assets/image.png"
import { jwtDecode } from "jwt-decode"

function PostDetail() {
    const token = localStorage.getItem("token")
    const [post, setPost] = useState(null)
    const [error, setError] = useState('')
    const [content, setContent] = useState('')
    const { id } = useParams()

    let userId;
    if (token) {
        const decoded = jwtDecode(token)
        userId = decoded.id
        // console.log(userId)
    }


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

    if (!post) return

    const handleSubmit = async (e, postId) => {
        e.preventDefault();
        setContent("")
                const res = await fetch("http://localhost:3030/api/comments", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({content, postId})
                })
                const data = await res.json()
                if(!res.ok) {
                    setError(data.message)
                    console.log(data.message)
                }
    }

    const edited = post.content.split(". ")
    // console.log(edited)
    const para = edited.map((p, index) => {
        return <p key={index}>{index}  {p}</p>
    });

    return (

        <section className="post-details container">
            <div className="avatar">
                {/* <h3>by {post.username} || Guest</h3> */}
            </div>
            <h1 className="post-title">{post.title}</h1>
            <img src={post.imageUrl} alt={post.title} className="post-img" />
            <div className="post-content">
                <p className="content">{post.content}</p>
                <br />
                <hr />
                <br />
                <h3>Responses</h3>
                {post.comments > 0 && post.comments.map(c => {
                    console.log({c})
                 return (<div className="comment">
                        <div className="user">
                            <img src={image} className="user-img" alt="" width={"35px"} />
                            <div className="date">
                                <h4>@{c.author}</h4>
                                <h6>{c.createdAt}</h6>
                            </div>
                        </div>
                        <hr />
                        <div className="comment-details">
                            <p>{c.content}</p>
                            <button>like</button>
                        </div>
                    </div>
                    )
            })}
                <div className="comments">

                    <div className="addComment">
                        <form onSubmit={(e) => {handleSubmit(e, post.id)}}>
                            <br />
                            <input
                                className="comment-inp"
                                type="text"
                                value={content}
                                onChange={(e) => { setContent(e.target.value) }}
                                placeholder="What are your thoughts?"
                            />
                            <button type="submit">Comment</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PostDetail