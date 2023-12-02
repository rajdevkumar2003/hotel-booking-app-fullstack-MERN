import { useState } from "react";
import { Link, Navigate ,useNavigate} from "react-router-dom";
import axios from 'axios';
export default function RegisterPage(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate();
    async function registerUser(e){
        e.preventDefault();
        try {
           const response= await axios.post('/register',{
                name,
                email,
                password,
               });

           if(response.status==200){
                navigate('/')
            
               alert('Registration successful');
            }

        } catch (error) {
            alert('User is already registered');
        }
       
    }
    return (
        <div className="mt-16">
        <h1 className="text-4xl text-center ">Register</h1>
        <div className="flex items-center justify-center mt-10">
            <form onSubmit={registerUser} className="flex flex-col justify-center items-center gap-6 w-1/2">
              <input type="name" placeholder="your name" value={name} onChange={(e)=>setName(e.target.value)} />
              <input type="email" placeholder="your@gmail.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
              <input type="password" placeholder="****" value={password} onChange={e=>setPassword(e.target.value)}/>
              <button className="login primary">Register</button>
              <p className="text-gray-400">Already have an account? <Link to={'/login'} className="underline text-black font-semibold">login</Link></p>
            </form>
        </div>
        </div>
    )
}