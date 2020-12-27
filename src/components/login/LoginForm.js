import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { loginAction } from '../../actions/loginAction';
import { saveUserOnCookie } from '../../cookies/cookies';
import { loginToSite } from '../../server/auth';
import { LoginContext } from '../context/LoginContext';
import Loader from '../loaders/Loader';

const LoginForm = (props)=>{
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isUsernameValid, setIsUsernameValid] = useState(true)
    const [isPasswordValid, setIsPasswordValid] = useState(true)
    const {userDispatch} = useContext(LoginContext);
    const [errorMessage, setErrorMessage] = useState("")
    const [isUserLoading,setIsUserLoading] = useState(false)
    const history = useHistory()
    const changeForm = ()=>{
        history.push('/sign-up')
    }

    const onBlurUsernameInput = (event)=>{
        const input = event.target.value.trim()
        if (input === '') {
            setIsUsernameValid(false)
            setUsername("")
            return
        }
        setUsername(input)
        setIsUsernameValid(true)
    }

    const onBlurPassword = (event)=>{
        const input = event.target.value.trim()
        if (input === '') {
            setPassword('')
            setIsPasswordValid(false)
            return
        }

        setPassword(input)
        setIsPasswordValid(true)

    }

    const isFormInValid = ()=>{
        return username === '' || password === ''
    }

    const onSubmitForm = (event)=>{
        event.preventDefault()
        setIsUserLoading(true)
        loginToSite(username,password).then(
            (userData)=>{
                userDispatch(loginAction(userData))
                saveUserOnCookie(userData)
                history.push("/home");
            },
            (err)=>{
                setErrorMessage(err.message)
                setIsUserLoading(false)
            }
        )
        
    }


    return (
        <div className="login-form">
            <form onSubmit={onSubmitForm}>
            <h3>Login</h3>
            {errorMessage !== "" && <div className="error-message">{errorMessage}</div>}
                <div className="input">
                    <input placeholder="username" onBlur={onBlurUsernameInput}></input>
                    {!isUsernameValid && <div className="invalid-message">You must enter a valid username</div>}
                </div>
                <div className="input">
                    <input type="password" placeholder="password" onBlur={onBlurPassword}></input>
                    {!isPasswordValid && <div className="invalid-message">You must enter a password</div>}
                </div>
                <button type="submit" disabled={isFormInValid()}>Submit</button>
                <div className="change-form" onClick={changeForm}>Sign up</div>
            </form>
            {isUserLoading && <Loader />}
        </div>
    )
}

export default LoginForm;