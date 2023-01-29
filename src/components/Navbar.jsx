import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
const Navbar = () => {
    const [user] = useAuthState(auth)
  return (
    <div className='navbar'>
        <h1>{user?.username}</h1>
        <img src={user?.profilePhoto} alt="" />
        <div className="NavContainer">
            <Link to='/'>Home</Link>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
        </div>
    </div>
  )
}

export default Navbar