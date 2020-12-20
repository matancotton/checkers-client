import React, { useContext } from 'react';
import { LoginContext } from '../context/LoginContext';
import LoginForm from '../login/LoginForm';

const HomePage = ()=>{
    const {userState} = useContext(LoginContext)

    return (
        <div className="home-page">
            <h1>Welcome</h1>
            {!userState.user && <h3>Please login to continue</h3>}
            {
            !!userState.user?
            <h3>Hello {userState.user.username}, we were waiting for you</h3>:
            <LoginForm/>
            }
            
        </div>
    )
}

export default HomePage;