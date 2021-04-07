import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN } from '../utils/mutations'; // mutation for login
import Auth from '../utils/auth'; // authentication 


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
        <main className="container">
            <h1>Login</h1>
            <form onSubmit={onFormSubmit}>
                <div className="mb-3">
                <input
                  placeholder="username"
                  className="form-control"
                  name="username"
                  type="username"
                  id="username"
                  value={formState.username}
                  onChange={onFormChange}
                />
                </div>
                <div class="mb-3">
                <input
                  placeholder="password"
                  className="form-control"
                  name="password"
                  type="password"
                  id="password"
                  value={formState.password}
                  onChange={onFormChange}
                />
                </div>
                <button type="submit" className="btn btn-primary">Enter</button>
            </form>
        </main>
    )
}

export default Login; 