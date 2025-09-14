import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "../../styles/postDetails.css"
import image from "../../assets/image.png"
import { jwtDecode } from "jwt-decode"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime.js";

dayjs.extend(relativeTime)

function PostDetail() {
    const token = localStorage.getItem("token")
    const [post, setPost] = useState(null)
    const [error, setError] = useState('')
    const [content, setContent] = useState('')
    const [refresh, setRefresh] = useState(0)
    const [success, setSuccess] = useState("")
    const { id } = useParams()

    let userId;
    if (token) {
        const decoded = jwtDecode(token)
        userId = decoded.id
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
    }, [id, token, refresh])

    if (!post) return

    const handleSubmit = async (e, postId) => {
        e.preventDefault();
        setContent("")
        setRefresh("")
        const res = await fetch("http://localhost:3030/api/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ content, postId })
        })
        const data = await res.json()
        if (!res.ok) {
            setError(data.message)
            console.log(data.message)
        }
        setRefresh(prev => prev + 1)
    }

    const dltComment = async (commId) => {
        console.log( commId)
        setRefresh("")
        setSuccess("")
        setError("")
        try {
            const res = await fetch(`http://localhost:3030/api/comments/${commId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
    
            const data = await res.json()
            if(!res.ok) {
                setError(data.message)
                console.log(data.message)
            }
            setSuccess("commented successfully")
            setRefresh(prev => prev + 1)
        } catch (error) {
            console.error(error)
            setError(error)
        }
    }
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
                <img src={image} className="avater" alt="" width={"35px"}/>
                <div className="date">
                <h3>by@{post.author.username}</h3>
                <h5>{dayjs(post.author.created_at).fromNow()}</h5>
                </div>
            </div>
            <div className="post-content">
                <div className="content" dangerouslySetInnerHTML={{ __html: post.content }}>

                </div>

                <hr />
                <h3 className="response">Responses</h3>

                <div className="comments">
                    <div className="addComment">
                        <form onSubmit={(e) => { handleSubmit(e, post.id) }}>
                            <br />
                            <input
                                className="comment-inp"
                                type="text"
                                value={content}
                                onChange={(e) => { setContent(e.target.value) }}
                                placeholder="What are your thoughts?"
                            />
                            <button type="submit" className="addBtn">Comment</button>
                        </form>
                    </div>
                    <div className="comment-section">
                        {post.comments.map(c => {

                            return <div className="comment" key={c.id}>
                                <div className="user">
                                    <img src={image} className="user-img" alt={c.id} width={"35px"} />
                                    <div className="date">
                                        <h4>@{c.author.username}</h4>
                                        <h6>{dayjs(c.created_at).fromNow()}</h6>
                                    </div>
                                    <div className="options">
                                        <p>⁝</p>
                                        <div className="option-details">
                                            <button className="delete" onClick={() => {dltComment(c.id)}}>Delete</button>
                                            <button className="edit">Edit</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="comment-details">
                                    <p>{c.content}</p>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PostDetail