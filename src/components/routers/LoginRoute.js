import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';


const LoginRoute = ({component:Component, ...rest})=>{
    const {userState} = useContext(LoginContext)

    return (
        <Route
            {...rest}
            component = {(props)=>{
                return !!userState.user ?
                <Redirect to="/home" />:
                <Component {...props} {...rest} />
            }}
        />
    
        )
    };
    

export default LoginRoute;