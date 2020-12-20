import React, { createContext, useReducer } from 'react'
import { getUserFromCookie } from '../../cookies/cookies';
import loginReducer, { initialUserState } from '../../reducers/loginReducer';


export const LoginContext = createContext();

const LoginContextProvider = (props)=>{
    const cookieUserData = getUserFromCookie();
    const [userState, userDispatch] = useReducer(loginReducer,cookieUserData || initialUserState)
    

    return (
        <LoginContext.Provider value={{userState, userDispatch}} >
            {props.children}
        </LoginContext.Provider>
    )
}


export default LoginContextProvider;