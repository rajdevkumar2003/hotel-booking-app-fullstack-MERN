import axios from "axios";
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const navigate=useNavigate();
    const {setUser}=useContext(UserContext)
    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try {
           const {data}=await axios.post('/login', {email,password});
           setUser(data);
           alert('Login successful');
           setRedirect(true);
        } catch (e) {
          alert('Login failed');
        }
      }
    
      if (redirect) {
        return navigate('/');
      }
    return (
        <div className="mt-16 h-full flex flex-col ">
        <h1 className="text-4xl text-center ">Login</h1>
        <div className="flex items-center justify-center mt-10">
            <form onSubmit={handleLoginSubmit} className="flex flex-col justify-center items-center gap-6 w-1/2">
              <input  type="email" placeholder="your@gmail.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
              <input  type="password" placeholder="****" value={password} onChange={e=>setPassword(e.target.value)}/>
              <button className="login primary">Login</button>
              <p className="text-gray-400">Don't have an account? <Link to={'/register'} className="underline text-black font-semibold">Register</Link></p>
            </form>
        </div>
        </div>
    )
}