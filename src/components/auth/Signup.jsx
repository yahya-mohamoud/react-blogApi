import { useState, useEffect } from "react"
import "../../styles/login.css"
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"


function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [username, setUsername] = useState("")
    const [error, setError] = useState('')


    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("")
        try {
            const res = await fetch("http://localhost:3030/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ email, password, username, confirm })

            })
            const data = await res.json()
            if (!res.ok) {
                setError(data.message)

                setTimeout(() => {
                    setError('')
                }, 4000);
                return;
            }
            navigate('/auth/login')
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
            <div className="loginForm signupForm">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        value={username}
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
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
                    <label htmlFor="confirm">Confirm: </label>
                    <input
                        type="password"
                        value={confirm}
                        placeholder="confirm"
                        onChange={(e) => setConfirm(e.target.value)}
                        minLength={"8"}
                    />
                    <button type="submit" className="btn">Signup</button>

                </form>
                <p className="para">You have an account <span><NavLink to="/auth/login">Login here</NavLink></span></p>
            </div>
        </>

    )
}

export default Login