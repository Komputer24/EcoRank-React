import './LoginPage.css'

export default function LoginPage() {
  return (
      <div className="login-container">
        <h1 className="login-title">Login</h1>
        <input
          type="text"
          placeholder="Email or username"
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
        />
        <button className="login-button">Continue</button>
      </div>
  )
}
