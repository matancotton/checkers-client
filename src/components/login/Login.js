import React, { useState } from 'react';
import LoginForm from './LoginForm';
import Subscribe from './Subscribe';


const Login = (props)=>{
    const [isLoginMode] = useState(props.isLoginMode)

    return (
        <div className="login-container">
            {isLoginMode?<LoginForm/>:<Subscribe/>}
        </div>
    )
}

export default Login;