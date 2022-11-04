import React, { useState, useEffect } from 'react';


export function LoginPage (props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')
//sign up state here
  const [signup , toggleSignUp] = useState(false);

//deconstruct the props
  const { loginHandler } = props;


  function handleClick() {
    let action;
    if (signup) action = 'signup'
    else action = 'login'
    let url = '/users/' + action
    fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': "application/json, text/plain",
            'Content-Type': 'application/json',
            'x-Trigger': 'CORS'
          },
          body: JSON.stringify({username: username, password: password})
    })
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                console.log(res)
                loginHandler(username);
                return res;
            }
        });
};

  //login/signup modals
  return (
    <div className ="main">
      <h1>Welcome to CABI.NET</h1>
      <div className="LoginDiv">
        <h2 id="loginHeader">{signup ? 'SIGN UP' : 'LOGIN'}</h2>
        <div className="loginForm">
          <input type = "text" placeholder="username" value={username} onChange ={(e) => {setUsername(e.target.value)}} required/>
          <input type = "password" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}} required/>
        </div>
        <div className="loginSubmitContainer">
          <button onClick={() => {handleClick()}} className="loginButton">Submit</button>
        </div>
        { signup 
          ? <div> <p>Already have an account?</p><button onClick={() => {toggleSignUp(false)}}>Return to Login</button> </div> 
          : <div className="signupToggle"> <p>Don't have an account?</p><button onClick={() => {toggleSignUp(true)}}>Sign Up</button></div>     
        }
      </div> 
    </div>
  );
}