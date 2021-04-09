import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN } from '../utils/mutations'; // mutation for login
import Auth from '../utils/auth'; // authentication 

import '../login.css'


const Login = () => {
    const [formState, setFormState] = useState({ username: "", password: "" });
    const [login, { error }] = useMutation(LOGIN);
  
    const onFormChange = (e) => {
      const { name, value } = e.target;
      setFormState({
        ...formState,
        [name]: value,
      });
    };
  
    const onFormSubmit = async (e) => {
      e.preventDefault();
      try {
        const { data } = await login({ variables: { ...formState } });
        setFormState({ username: "", password: "" });
        Auth.login(data.login.token);
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <body className="login-body">
        <main className="container pt-5">
            <form onSubmit={onFormSubmit} className="col-md-4">
            <h1 className="login-title text-center pb-3">Login</h1>
                <div className="mb-3">
                <input
                  className="form-login"
                  name="username"
                  type="username"
                  id="username"
                  value={formState.username}
                  onChange={onFormChange}
                />
                <label for="name" className="form-label">username</label>
                </div>
                <div class="mb-3">
                <input
                  className="form-login"
                  name="password"
                  type="password"
                  id="password"
                  value={formState.password}
                  onChange={onFormChange}
                />
                <label for="password" className="form-label">password</label>
                </div>
                <button type="submit" className="login-button">Enter</button>
            </form>
        </main>
        </body>
    )
}

export default Login; 