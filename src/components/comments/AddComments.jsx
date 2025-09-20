import { useContext } from "react";
import { AuthContext } from "../../App";

function AddComments({setContent, content, postId, setRefresh, refresh}) {
    const {token, setToken, error, setError, setSuccess} = useContext(AuthContext)
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setContent("")
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
            setError("You're unauthorized to comment")
            console.log( "you're not authorized")
            return
        } else {
            setSuccess("Commented Successfully")
            setRefresh(prev => prev + 1)
        }
    }
    console.log(refresh)
  return (
    <div className="addComment">
                        <form onSubmit={handleSubmit}>
                            <br />
                            <input
                                className="comment-inp"
                                type="text"
                                value={content}
                                onChange={(e) => { setContent(e.target.value) }}
                                placeholder="What are your thoughts?"
                                required
                            />
                            <button type="submit" className="addBtn">Comment</button>
                        </form>
                    </div>
  )
}

export default AddComments