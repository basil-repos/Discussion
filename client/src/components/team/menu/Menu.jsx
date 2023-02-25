import './Menu.scss';
import GridViewIcon from '@mui/icons-material/GridView';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { Link, useLocation } from 'react-router-dom';

const Menu = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];

    return (
        <div className="menu-container">
            <div className="wrapper">
                <Link to={`/teams/${id}`} className="item">
                    <GridViewIcon className="icon" />
                </Link>
                <Link to={`/teams/${id}/discussions`} className="item">
                    <ForumOutlinedIcon className="icon" />
                </Link>
                <Link to={`/teams/${id}/members`} className="item">
                    <PeopleOutlineIcon className="icon" />
                </Link>
            </div>
        </div>
    )
}

export default Menu