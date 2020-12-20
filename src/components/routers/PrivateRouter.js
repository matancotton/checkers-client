import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';


const PrivateRoute = ({component:Component, ...rest})=>{
    const {userState} = useContext(LoginContext)


    return (
        <Route 
            {...rest}
            component = {(props)=>{
                return !!userState.user ?
                <Component {...props}/>:
                <Redirect to={{pathname:"/home", state:{needToLogin: true}}}/>
            }}
        />

    )
};

export default PrivateRoute;