import React from './TeamLayout.scss';
import { Outlet } from 'react-router-dom'
import Menu from '../../components/team/menu/Menu';

const TeamLayout = () => {
    return (
        <div className="page teamlayout-container">
            <div className="menu">
                <Menu />
            </div>
            <div className="wrapper">
                <Outlet />
            </div>
        </div>
    )
}

export default TeamLayout