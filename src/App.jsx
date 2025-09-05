import { useState, useEffect } from 'react'
import './App.css'
import Login from './auth/Login'
import Posts from './components/Post'
import Navbar from './components/Navbar'
import Home from './components/Home'

function App() {
  // const [token, setToken] = useState(localStorage.getItem("token"))

  return (
    <>
    <Navbar />
     <Home />
    </>
  )
}

export default App
