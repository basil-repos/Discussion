import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Overview.scss';
import { axiosInstance } from '../../config';
import moment from 'moment';

const Overview = () => {
    const [details, setDetails] = useState({});
    const location = useLocation();
    const id = location.pathname.split("/")[2];

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const res = await axiosInstance.get("/teams/"+id);
                setDetails(res.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchTeam();
    },[id])
    
    return (
        <div className="contents">
            <img src={details.cover_photo} alt="" className="cover-photo" />
            <div className="header">
                <h1 className="title">{details.title}</h1>
                <span className="date">Created on {moment(details.createdAt).format('Do MMM YYYY')}</span>
            </div>
            <p className="desc">{details.description}</p>
        </div>
    )
}

export default Overview