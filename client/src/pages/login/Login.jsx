import React, { useState } from 'react'
import './Login.css'
import { NavigationBar } from '../../components/navigation/NavigationBar'
import { useAuth } from '../../context/AuthProvider'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function loginUser(e){
    e.preventDefault();
    try {
      const data = await login({username: username, password: password})
      if(data.isSuccess){
        navigate('/');
      }else{
        setError(data.message);
      }
    } catch (error) {
      setError("Sorry, something went wrong!");
    }
  }
  return (
    <>
    <NavigationBar title="Login" />
    <form className='login-form' onSubmit={loginUser}>
        {error && <div className="error-message">{error}</div>}
        <div className="form-control">
            <label htmlFor="username">Username</label>
            <input type="text" id='username' onChange={e=>{ setUsername(e.target.value) }} />
        </div>
        <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" id='password' onChange={e=>{ setPassword(e.target.value) }} />
        </div>
        <button type="submit">Login</button>
    </form>
    </>
  )
}
