import { useState, useEffect } from 'react'
import './App.css'
import Login from './components/auth/Login'
import Posts from './components/posts/Post'
import Navbar from './components/layout/Navbar'
import Home from './components/Home'
import { createContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './components/auth/Signup'
import PostDetail from './components/posts/PostDetail'
import { jwtDecode } from 'jwt-decode'

export const AuthContext = createContext()
function App() {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [loggedin, setLoggedin] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
      if (isTokenExpired(storedToken)) {
        logout()
      } else {
        setToken(storedToken)
      }
    }
  }, [])

  function logout() {
    localStorage.removeItem("token")
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, setToken, logout, setLoggedin, loggedin, success, setSuccess, error, setError, refresh, setRefresh }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/signup' element={<Signup />} />
          <Route path='/posts' element={<Posts />} />
          <Route path='/posts/:id' element={<PostDetail />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

function isTokenExpired(token) {
  try {
    const decoded = jwtDecode(token);
    if (!decoded.exp) return false; // no expiry claim, assume valid
    return decoded.exp * 1000 < Date.now();
  } catch (e) {
    return true;
  }
}
export default App
