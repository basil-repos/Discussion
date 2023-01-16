import './Register.scss';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Alert, CircularProgress } from "@mui/material";
import { axiosInstance } from "../../config";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";

const Register = () => {
    const [credentials, setCredentials] = useState({
        name: "",
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
        if(credentials.name === "" || credentials.email === "" || credentials.password === ""){
            setLoading(false);
            if(credentials.name === ""){
                setErrMsg("Name Required");
            } else if(credentials.email === ""){
                setErrMsg("Email Address Required");
            } else if(credentials.password === ""){
                setErrMsg("Password Required");
            }
            return;
        }
        try {
            const res = await axiosInstance.post("/auth/signup", credentials);
            setLoading(false);
            if(res.status === 200){
                dispatch(setUser(res.data));
                navigate("/");
            }else{
                setErrMsg(res.message)
            }
        } catch (error) {
            setLoading(false);
            setErrMsg(error.message);
        }
    }

    return (
        <div className='register'>
            <div className="card">
                <h1>Sign Up</h1>
                <div className="form-group">
                    <div className="input-group">
                        <PersonOutlineIcon />
                        <input type="text" id="name" placeholder='Full Name' onChange={handleChange} />
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
                {errMsg && <Alert severity="error">{errMsg}</Alert>}
                <button onClick={handleSubmit} className={loading ? 'button disabled' : 'button'}>
                    {loading && <CircularProgress style={{ width: '20px', height: '20px', color: 'white', zIndex: 3, position: 'absolute' }} />}
                    SIGN UP
                </button>
                <div className='register-info'>
                    <p>Already Have An Account? <Link to="/signin" className='link'>Log In</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Register