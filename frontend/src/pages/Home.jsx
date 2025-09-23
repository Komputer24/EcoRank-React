import './Home.css'
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();  

  return(
        <>
        <div id="appName">
            <h1 style={{color: '#267988'}}>Eco</h1><h1 style={{color: '#88a24a'}}>Rank</h1>
        </div>
        <div id="btns">
            <button className="btn" onClick={() => navigate('/login')}>Login</button>
            <button className="btn" onClick={() => navigate('/signup')}>Signup</button>
        </div>
        <p style={{fontSize: '22px'}}>Developed by Kaleab Beteselassie</p>
        </>
  )
}