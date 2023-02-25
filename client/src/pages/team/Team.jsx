import './Team.scss';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../config';
import TeamCard from '../../components/team/teamcard/TeamCard';

const Team = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const res = await axiosInstance.get("/teams");
                setData(res.data);
            } catch (error) {
                console.log(error)
            }
        }

        fetchTeams();
    },[])

    return (
        <div className="teams page">
            <div className="header">
                <Link className='add link' to="/teams/create"><AddIcon /> Create</Link>
            </div>
            <div className="contents">
                {data && data.map((item) =>
                    <TeamCard team={item} key={item._id} />
                )}
            </div>
        </div>
    )
}

export default Team