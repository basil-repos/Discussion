import './Home.scss';
import Alert from '@mui/material/Alert';
import { useSelector } from 'react-redux';

const Home = () => {
    const {currentUser} = useSelector(state => state.user);

    return (
        <div className='home page'>
            <Alert severity="info" sx={{ width: '100%', marginTop: '20px' }}>Wellcom {currentUser.name}</Alert>
        </div>
    )
}

export default Home