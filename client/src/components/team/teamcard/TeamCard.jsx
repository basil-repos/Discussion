import './TeamCard.scss';
import moment from 'moment';
import { Link } from 'react-router-dom';

const TeamCard = ({team}) => {
    return (
        <div className='card'>
            <img src={team.cover_photo} alt="" />
            <span className={`status ${team.publish === 0 ? 'publish' : 'draft'}`}>{team.publish === 0 ? 'Published' : 'Draft'}</span>
            <div className="info">
                <div className="info-header">
                    <Link to={`/teams/${team._id}`} className="title link">{team.title}</Link>
                    <span className="date">{moment(team.createdAt).format('Do MMM YYYY')}</span>
                </div>
                <div className="desc">{team.description}</div>
            </div>
        </div>
    )
}

export default TeamCard