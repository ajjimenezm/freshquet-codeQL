import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate();
    useEffect(() => {
        const user = localStorage.getItem('userToken');
        if (!user) {
            navigate('/login')
        }
    }, [])
    return (
        <div>
            <h1>Profile</h1>
        </div>
    );
}

export default Profile;
