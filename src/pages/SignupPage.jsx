import './SignupPage.css'

export default function SignupPage() {
  return (
    <div className="signup-container">
      <h1 className="signup-title">Signup</h1>
      <input
        type="text"
        placeholder="Email or username"
        className="signup-input"
      />
      <input
        type="password"
        placeholder="Password"
        className="signup-input"
      />
      <input
        type="password"
        placeholder="Confirm password"
        className="signup-input"
      />
      <button className="signup-button">Create Account</button>
    </div>
  )
}