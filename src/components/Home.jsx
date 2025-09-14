import image from "../assets/blogImage.svg"
import '../styles/home.css'
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { AuthContext } from "../App"
import Post from "./posts/Post"


function Home() {
  const [error, setError] = useState("")
  const { token, success, setSuccess } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleClick = () => {
    {
      token ? (
        navigate('/posts')
      ) : (
        navigate('/auth/login')
      )
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
    <>
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
      <div className="home-container">
        <div className="hero">
          <div className="info">
            <h1>Read, Write, Implement.</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint unde autem provident similique harum natus minus neque eius sapiente commodi, tempora ea molestiae odio iure dolore pariatur deleniti eos quibusdam?
              Possimus id nostrum sunt ad quis, placeat expedita facere non exercitationem minima corporis ab neque impedit, itaque quisquam repudiandae eos excepturi? Deserunt, veniam minima repellat aliquid dolore placeat quia quasi!</p>
          </div>
          <div className="blog-img">
            <img src={image} alt="" />
          </div>
        </div>
        <button className="cta-btn" onClick={handleClick}>Start Reading Today</button>
      </div>

      <div className="home-posts">
        <Post />
      </div>
    </>
  )
}

export default Home