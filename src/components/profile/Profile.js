import React, { useContext } from 'react';
import { LoginContext } from '../context/LoginContext';


const Profile = ()=>{
    const {userState} = useContext(LoginContext)

    return (
    <div className="profile-conatiner">
        <div className="profile">
            <div><label>Name: </label><label>{userState.user.username}</label></div>
            <div><label>email: </label><label>{userState.user.email}</label></div>
            <div><label>age: </label><label>{userState.user.age}</label></div>
        </div>

    </div>)
}

export default Profile;