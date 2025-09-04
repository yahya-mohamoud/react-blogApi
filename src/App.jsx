import { useState, useEffect } from 'react'
import './App.css'
import Login from './auth/Login'
import Posts from './components/Post'

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"))

  return (
    <div className="container">
      {!token ? (
        <Login onLogin={setToken} />
      ) :
        (
          <>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                setToken(null);
              }}
            >
              Logout
            </button>
            <Posts />
          </>
        )
      }


    </div>
  )
}

export default App
