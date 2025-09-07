import { useState, useEffect } from "react"
import "../../styles/login.css"
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../App"
import { useContext } from "react"


function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const { setToken, setLoggedin } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("")
        try {
            const res = await fetch("http://localhost:3030/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ email, password })

            })


            const data = await res.json()
            if (!res.ok) {
                setError(data.message )
                setTimeout(() => {
                    setError("")
                }, 3000)
                return;
            }
            localStorage.setItem("token", data.token)
            setToken(data.token)
            setLoggedin(true)
            navigate('/')
        } catch (error) {
            console.error("Error Loading in: ", error.message)
        }
    }
    return (
        <>
        {error &&
                <div className="error">
                    <h4>{error}</h4>
                </div>}
            <div className="loginForm">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={"8"}
                        required
                    />
                    <button type="submit" className="btn">Login</button>

                </form>
                <p className="para">Don't have an account <span><NavLink to="/auth/signup">Register here</NavLink></span></p>
            </div>
        </>

    )
}

export default Login