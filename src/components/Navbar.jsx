import '../styles/navbar.css'
function Navbar() {
  return (
    <div className="header">
        <h1><a href="/">Daily Blog</a></h1>
        <div className="lists">
            <ul>
                <li>Login</li>
                <li>Signup</li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar