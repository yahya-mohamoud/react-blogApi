import { useState, useEffect, useContext } from 'react'
import image from "../../assets/image.png"
import { jwtDecode } from "jwt-decode"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime.js";
import { AuthContext } from '../../App';
import AddComments from './AddComments';
dayjs.extend(relativeTime)
function Comment({ post, refresh, setRefresh, content}) {
    const { token, setError, setSuccess, error, success } = useContext(AuthContext)
    const [isEditing, setIsEditing] = useState(false)
    const [newContent, setNewContent] = useState("")
    const dltComment = async (commId) => {
        setError("")
        setSuccess("")
        try {
            const res = await fetch(`http://localhost:3030/api/comments/${commId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })

            if (!res.ok) {
                setError("something went wrong!!")
                // console.log(data.message)
            } else {
                setSuccess( "comment deleted successfully")
                setRefresh((prev) => prev + 1)

            }
        } catch (error) {
            console.error(error)
            setError(error)
        }
    }

    const handleEdit = (e, commId) => {
        // e.preventDefault()
        // console.log(commId)
        // if(commId) {
        //     // setIsEditing(true)
        // }
    }
    return (
        <div className="comment-section">
            {post.comments.map(c => {

                return (
            <div className="comment" key={c.id}>
                {isEditing ? (
                   <div className="addComment">
                        <form onSubmit={(e) => handleEdit(e, c.id)}>
                            <br />
                            <input
                                className="comment-inp"
                                type="text"
                                value={newContent}
                                onChange={(e) => { setNewContent(e.target.value) }}
                                placeholder="What are your thoughts?"
                                required
                            />
                            <button type="submit" className="addBtn">Update</button>
                        </form>
                    </div>
                ): (
                    <>
                    <div className="user">
                        <img src={image} className="user-img" alt={c.id} width={"35px"} />
                        <div className="date">
                            <h4>@{c.author.username}</h4>
                            <h6>{dayjs(c.created_at).fromNow()}</h6>
                        </div>
                        <div className="options">
                            <p>⁝</p>
                            <div className="option-details">
                                <button className="delete" onClick={() => { dltComment(c.id) }}>Delete</button>
                                <button className="edit" onClick={(e) => handleEdit(e, c.id)}>Edit</button>
                            </div>
                        </div>
                    </div>
                    <div className="comment-details">
                        <p>{c.content}</p>
                    </div>
                    </>
                    )}
                </div>
        )
            })}
        </div>
    )
}

export default Comment