import './Register.scss';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Register = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials(prev => {
            return {...prev, [e.target.id]: e.target.value} 
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/");
    }

    return (
        <div className='register'>
            <div className="card">
                <h1>Sign Up</h1>
                <div className="form-group">
                    <div className="input-group">
                        <PersonOutlineIcon />
                        <input type="text" id="username" placeholder='Username' onChange={handleChange} />
                    </div>
                </div>
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
                <button className='button' onClick={handleSubmit}>SIGN UP</button>
                <div className='register-info'>
                    <p>Already Have An Account? <Link to="/login" className='link'>Log In</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Register