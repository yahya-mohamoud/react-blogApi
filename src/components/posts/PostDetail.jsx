import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import "../../styles/postDetails.css"
import image from "../../assets/image.png"
import { jwtDecode } from "jwt-decode"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime.js";
import Comment from "../comments/Comment.jsx"
import { AuthContext } from "../../App"
import AddComments from "../comments/AddComments.jsx"

dayjs.extend(relativeTime) // date formatter

function PostDetail() {
    const token = localStorage.getItem("token") 
    const [post, setPost] = useState(null)
    const [content, setContent] = useState('')
    const {success, setSuccess, error, setError, refresh, setRefresh} = useContext(AuthContext)
   
    const { id } = useParams()

    // to have an access in username and email
    let userId;
    if (token) {
        const decoded = jwtDecode(token)
        userId = decoded.id
    }
    // fetch single post to see its details
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
    }, [id, token, refresh])

    if (!post) return

   const handleCloseBtn = (e) => {
        e.preventDefault()
        setError("")
    }
    const handleSuccessBtn = (e) => {
        e.preventDefault()
        setSuccess("")

    }
    return (
        <section className="post-details container">
            {error &&
                <div className={"error"}>
                    <h4>{error}</h4>
                    <button onClick={handleCloseBtn}>X</button>
                </div>}
            {success &&
                <div className={"success"}>
                    <h4>{success}</h4>
                    <button onClick={handleSuccessBtn}>X</button>
                </div>}

            <img src={post.imageUrl} alt={post.title} className="post-img" />
            <h1 className="post-title">{post.title}</h1>
            <div className="author">
                <img src={image} className="avater" alt="" width={"35px"} />
                <div className="date">
                    <h3>by@{post.author.username}</h3>
                    <h5>{dayjs(post.created_at).fromNow()}</h5>
                </div>
            </div>
            <div className="post-content">
                <div className="content" dangerouslySetInnerHTML={{ __html: post.content }}>
                </div>
                <hr />
                <h3 className="response">Responses</h3>

                <div className="comments">
                    <AddComments 
                        content={content} 
                        setContent={setContent} 
                        refresh={refresh} 
                        setRefresh={setRefresh} 
                        postId={post.id}
                    />
                   < Comment 
                        post={post} 
                        refresh={refresh} 
                        setRefresh={setRefresh} 
                        content={content}
                        setContent={setContent}
                    />
                </div>
            </div>
        </section>
    )
}

export default PostDetail