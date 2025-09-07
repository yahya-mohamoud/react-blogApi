import { useState } from 'react'
import './App.css'
import Login from './components/auth/Login'
import Posts from './components/posts/Post'
import Navbar from './components/layout/Navbar'
import Home from './components/Home'
import { createContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './components/auth/Signup'
import PostDetail from './components/posts/PostDetail'

export const AuthContext = createContext()
function App() {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [loggedin, setLoggedin] = useState(false)
  return (
    <AuthContext.Provider value={{ token, setToken, loggedin, setLoggedin }}>
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

export default App
