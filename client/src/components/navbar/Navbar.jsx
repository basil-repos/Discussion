import './Navbar.scss'
import logo from "../../assets/images/logo.jpg"
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TaskIcon from '@mui/icons-material/Task';
import SourceIcon from '@mui/icons-material/Source';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import GroupsIcon from '@mui/icons-material/Groups';

const Navbar = () => {
    const [open, setOpen] = useState(false);

    const location = useLocation();

    return (
        <div className='container'>
            <div className='navbar'>
                <div className="wrapper">
                    <div className="left">
                        <div className="item">
                            <img src={logo} alt="" className='logo' />
                        </div>
                    </div>
                    <div className='center'>
                        <Link className='link' to="/">
                            <div className={`item ${location.pathname === "/" ? 'active': ''}`}>
                                <DashboardIcon className='icon' />
                                <span>Dashboard</span>
                            </div>
                        </Link>
                        <Link className='link' to="/teams">
                            <div  className={`item ${location.pathname === "/teams" ? 'active': ''}`}>
                                <GroupsIcon className='icon' />
                                <span>Teams</span>
                            </div>
                        </Link>
                        <Link className='link' to="/projects">
                            <div  className={`item ${location.pathname === "/projects" ? 'active': ''}`}>
                                <SourceIcon className='icon' />
                                <span>Projects</span>
                            </div>
                        </Link>
                        <div className="item">
                            <TaskIcon className='icon' />
                            <span>Tasks</span>
                        </div>
                    </div>
                    <div className="right">
                        <div className="item" onClick={() => setOpen(prev => !prev)}>
                            <img src={logo} alt="" className='profile-image' />
                        </div>
                    </div>
                </div>
            </div>
            {open && <div className="tabs">
                <div className="item">
                    <AccountCircleIcon />
                    Profile
                </div>
                <div className="item">
                    <LogoutIcon />
                    Logout
                </div>
            </div>}
        </div>
    )
}

export default Navbar