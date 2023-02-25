import './Project.scss'
import AddIcon from '@mui/icons-material/Add';

const Project = () => {
    return (
        <div className='project page'>
            <div className="header">
                <button className='add'><AddIcon /> Create</button>
            </div>
            <div className="contents">
            </div>
        </div>
    )
}

export default Project