import './Login.scss';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Alert, CircularProgress } from "@mui/material";
import { axiosInstance } from "../../config";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    const [errMsg, setErrMsg] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials(prev => {
            return {...prev, [e.target.id]: e.target.value} 
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setErrMsg(null);

        if(credentials.email === "" || credentials.password === ""){
            setLoading(false);
            if(credentials.email === ""){
                setErrMsg("Email Address Required");
            } else if(credentials.password === ""){
                setErrMsg("Password Required");
            }
            return;
        }

        try {
            const res = await axiosInstance.post("/auth/login", credentials);
            setLoading(false);
            if(res.status === 200){
                dispatch(setUser(res.data));
                navigate("/");
            }else{
                setErrMsg(res.message)
            }
        } catch (error) {
            setLoading(false);
            setErrMsg(error.response.data.message);
        }
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
                {errMsg && <Alert severity="error">{errMsg}</Alert>}
                <Link to="/" className='link'>Forgot Password?</Link>
                <button  className={loading ? 'button disabled' : 'button'} onClick={handleSubmit}>
                    {loading && <CircularProgress style={{ width: '20px', height: '20px', color: 'white', zIndex: 3, position: 'absolute' }} />}
                    LOGIN
                </button>
                <div className='register-info'>
                    <p>Not a Member? <Link to="/signup" className='link'>Create an Account</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login