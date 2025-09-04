import { useState, useEffect } from "react"

function Login({ onLogin }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3030/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ email, password })

            })

            if (!res.ok) throw new Error("Login failed")

            const data = await res.json()
            
            localStorage.setItem("token", data.token)
            onLogin(data.token)
        } catch (error) {
            console.error("Error Loading in: ", error.message)
        }
    }
    return (
        <div className="loginForm">
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login