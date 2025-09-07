import image from "../assets/blogImage.svg"
import '../styles/home.css'
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../App"
import Post from "./posts/Post"

function Home() {
const {token } = useContext(AuthContext)
const navigate = useNavigate()
  
const handleClick = () =>{ 
    {token ? (
      navigate('/posts')
    ):(
      navigate('/auth/login')
    )}
  }

  return (
    <>
      <div className="home-container">
        <div className="hero">
          <div className="info">
            {/* <h1>Daily Blog</h1> */}
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
        <Post/>
      </div>
    </>
  )
}

export default Home