import './Navbar.scss'
import logo from "../../assets/images/logo.jpg"
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className="wrapper">
                <div className="left">
                    <div className="item">
                        <img src={logo} alt="" className='logo' />
                    </div>
                </div>
                <div className="right">
                    <div className="item">
                        <img src={logo} alt="" className='profile-image' />
                    </div>
                </div>
            </div>
            <div className="tabs">
                <div className="item">
                    <AccountCircleIcon />
                    Profile
                </div>
                <div className="item">
                    <LogoutIcon />
                    Logout
                </div>
            </div>
        </div>
    )
}

export default Navbar