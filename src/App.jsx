  import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import Login from './pages/LoginPage'
import Signup from './pages/SignupPage'

function Home() {
  const navigate = useNavigate()

  return (
    <>
      <div id="appName">
        <h1 style={{ color: '#267988' }}>Eco</h1>
        <h1 style={{ color: '#88a24a' }}>Rank</h1>
      </div>
      <div id="btns">
        <button className="btn" onClick={() => navigate('/LoginPage')}>Login</button>
        <button className="btn" onClick={() => navigate('/SignupPage')}>Signup</button>
      </div>
      <p style={{ fontSize: '22px' }}>Developed by Kaleab Beteselassie</p>
    </>
  )
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LoginPage" element={<Login />} /> 
        <Route path="/SignupPage" element={<Signup />} />
      </Routes>
    </Router>
  )
}