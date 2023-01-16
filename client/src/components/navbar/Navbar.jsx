import './Navbar.scss'
import logo from "../../assets/images/logo.jpg"
import { Link, useLocation } from "react-router-dom"

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className="wrapper">
                <div className="left">
                    <div className="item">
                        <img src={logo} alt="" />
                    </div>
                    <div className="item">
                        <Link to="/discussions" className='link'>DISCUSSIONS</Link>
                    </div>
                </div>
                <div className="right"></div>
            </div>
        </div>
    )
}

export default Navbar