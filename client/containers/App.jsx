import React, {useEffect, useState} from 'react';
import {LoginPage} from '../components/Login.jsx';
// import {Buffer} from 'buffer';
// Buffer.from('anything','base64');
import { userActionCreator, loggedInActionCreator, logOutActionCreator } from '../actions/actions'
import MainContainer from './MainContainer.jsx';
import { connect, useStore, useDispatch } from 'react-redux';
import '../style.css';
import { Cookies, useCookies } from 'react-cookie';



export default function App() {
  const [username, setUsername] = useState('');
  const [LoggedIn, toggleLoggedIn ] = useState(false);
  const dispatch = useDispatch();
  const [ cookies, setCookie, removeCookie] = useCookies();

  function loginHandler(username) {
		setUsername(username);
    dispatch(loggedInActionCreator())
		toggleLoggedIn(true);
	};

  const logoutHandler = () => {
    toggleLoggedIn(false);
    dispatch(logOutActionCreator());
    removeCookie('LoggedIn')
    removeCookie('JWT')
  };
  //this runs if logged in is TRUE
  useEffect(() => {
    console.log('LoggedIn');
   if (LoggedIn) dispatch(userActionCreator(username));
  }, [LoggedIn])

  //only runs once
  useEffect(() => {
    //this checks if the loggedIn cookie is set
    //in which it will set username to the cookie's value (username)
    //toggle logged in true and keep persist
    if (cookies.LoggedIn) {
      setUsername(cookies.LoggedIn)
      toggleLoggedIn(true)
    }
  }, [])
  
  return (
    <div className='appDiv'>
      {LoggedIn ? <MainContainer isLoggedIn={username !== '' ? true : false} logout={logoutHandler} />: <LoginPage loginHandler={loginHandler} />} 
    </div>
  );
};