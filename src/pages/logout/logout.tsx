import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        // Remove username from session
        sessionStorage.removeItem('username');
        // Redirect to login page
        navigate('/login');
    }, [navigate]);

    return null;
};

export default Logout;
