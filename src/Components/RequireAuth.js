import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RequireAuth = ({children}) => {
    const navigate = useNavigate()
    let user = JSON.parse(localStorage.getItem('user'))
    useEffect(() => {
        if(!user){
            navigate('/login')
            return
        }
    }, [user, navigate])
    return children
};

export default RequireAuth;