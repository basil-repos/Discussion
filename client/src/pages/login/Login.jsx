import './Login.scss';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setCredentials(prev => {
            return {...prev, [e.target.id]: e.target.value} 
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(credentials);
    }

    return (
        <div className='login'>
            <div className="card">
                <h1>Login</h1>
                <div className="form-group">
                    <div className="input-group">
                        <MailOutlineIcon />
                        <input type="email" id="email" placeholder='Email' onChange={handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <HttpsOutlinedIcon />
                        <input type="password" id="password" placeholder='Password' onChange={handleChange} />
                    </div>
                </div>
                <Link to="/" className='link'>Forgot Password?</Link>
                <button className='button' onClick={handleSubmit}>LOGIN</button>
                <div className='register-info'>
                    <p>Not a Member? <Link to="/register" className='link'>Create an Account</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login