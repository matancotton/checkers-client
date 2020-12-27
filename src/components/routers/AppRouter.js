import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import LoginContextProvider from '../context/LoginContext';
import MessagesContextProvider from '../context/MessagesContext';
import PlayersContextProvider from '../context/PlayersContext';
import HomePage from '../home/HomePage';
import Login from '../login/Login';
import Header from '../main/Header';
import Profile from '../profile/Profile';
import GameRoom from '../rooms/GameRoom';
import Scoreboard from '../scoreBoard/Scoreboard';
import LoginRoute from './LoginRoute';
import PrivateRoute from './PrivateRouter';


const AppRouter = ()=>(
    <BrowserRouter>
    <LoginContextProvider>
        <Header />
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/home" />
                </Route>
                <Route path='/home' component={HomePage} />
                <LoginRoute path="/login" component={Login} isLoginMode={true}/>
                <LoginRoute path="/sign-up" component={Login} isLoginMode={false} />
                <PrivateRoute path="/my-profile" component={Profile} />
                <PrivateRoute path="/score-board" component={Scoreboard} />
                <PlayersContextProvider>
                    <MessagesContextProvider>
                        <PrivateRoute path="/game-room" component={GameRoom} />
                    </MessagesContextProvider>
                </PlayersContextProvider>
                
                <Route path="*" component={HomePage}>
                </Route>
            </Switch>
        </LoginContextProvider>
    </BrowserRouter>
)

export default AppRouter;