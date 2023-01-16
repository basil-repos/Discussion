import './Sidebar.scss'
import HomeIcon from '@mui/icons-material/Home';

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className="item">
                <HomeIcon />
                <span>Home</span>
            </div>
            <div className="item">
                <HomeIcon />
                <span>Home</span>
            </div>
            <div className="item">
                <HomeIcon />
                <span>Home</span>
            </div>
            <div className="item">
                <HomeIcon />
                <span>Home</span>
            </div>
        </div>
    )
}

export default Sidebar