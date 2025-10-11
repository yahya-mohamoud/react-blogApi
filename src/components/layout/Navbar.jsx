import '../../styles/navbar.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App'
import { useContext } from 'react'
import { jwtDecode } from 'jwt-decode'
import image from "../../assets/image.png"

function Navbar() {
  const { token, setToken, logout } = useContext(AuthContext)
    const navigate = useNavigate()

  let username = ''
  let email = ''
  if (token) {
    const decoded = jwtDecode(token)
    username = decoded.username
    email = decoded.email
    // console.log(username, email)
  }

  const handleLogout = async (e) => {
    logout()
    navigate("/auth/login")
  }
  return (
    <div className="header">
      <h1><a href="/">Daily Blog</a></h1>
      <div className="lists">
        {token ? (
          <ul>
            <NavLink to='/posts'>Posts</NavLink>
            <div className="avatar">
              <div className="face">
                <img src={image} alt="" />
                <h4>@{username}</h4>
              </div>
              <div className="hidden">
                <h6>{email}</h6>
                <button type='submit' className='logout' onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </ul>
        ) : (
          <ul>
            <NavLink to='/auth/signup'
              className={({ isActive}) =>
                isActive ? "active" : ""
              }
            >Signup</NavLink>
            <NavLink to='/auth/login'
              className={({ isActive}) =>
                isActive ? "active" : ""
              }
            >Login</NavLink>

          </ul>
        )}
      </div>
    </div>
  )
}

export default Navbar