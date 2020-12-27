import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import { logoutAction } from '../../actions/loginAction';
import { deleteUserFromCookie } from '../../cookies/cookies';
import { logoutFromSite } from '../../server/auth';
import { LoginContext } from '../context/LoginContext';
const Header = ()=>{
    const {userState, userDispatch} = useContext(LoginContext)
    const history = useHistory()
    const logoutClicked = ()=>{
        logoutFromSite(userState)
        userDispatch(logoutAction())
        deleteUserFromCookie();
        history.push("/home")
    }
    return (
        <div className="header">
            <div className="header__nav">
                <NavLink to="/home" activeClassName="header__active-link">Home</NavLink>
                <div className="links">
                    {
                        !!userState.user?
                        <NavLink to="/my-profile" activeClassName="header__active-link">Profile</NavLink>:
                        <NavLink to="/sign-up" activeClassName="header__active-link">Sign-Up</NavLink>
                    }
                    {
                        !!userState.user?
                        <div className="header__logout-nav" onClick={logoutClicked}>Logout</div>:
                        <NavLink to="/login" activeClassName="header__active-link">Login</NavLink>
                    }
                    {!!userState.user && <NavLink to="/game-room" activeClassName="header__active-link">Game room</NavLink>}
                    {!!userState.user && <NavLink to="/score-board" activeClassName="header__active-link">Score board</NavLink>}
                </div>
            </div>
        </div>
    )
}

export default Header;