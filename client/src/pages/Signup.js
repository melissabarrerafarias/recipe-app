import React, { useState } from 'react';
import { useMutation } from "@apollo/react-hooks";
import { ADD_USER } from "../utils/mutations"; //mutation for adding a new user
import Auth from '../utils/auth';//authentication

import '../signup.css'

const SignUp = () => {
    const [formState, setFormState] = useState({
        username: "",
        password: ""
    });
    const [addUser, { error }] = useMutation(ADD_USER);

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
            const { data } = await addUser({ variables: { ...formState } });
            Auth.login(data.addUser.token);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <body className="signup-body">
        <main className="container pt-5">
            <form onSubmit={onFormSubmit} className="col-md-4">
            <h1 className="signup-title text-center pb-3">Sign Up</h1>
                <div className="mb-3">
                    <input
                        class="form-signup"
                        name="username"
                        type="username"
                        id="username"
                        value={formState.username}
                        onChange={onFormChange} />
                        <label for="name" className="form-label-signup">username</label>
                </div>
                <div class="mb-3">
                    <input
                        class="form-signup"
                        name="password"
                        type="password"
                        id="password"
                        value={formState.password}
                        onChange={onFormChange}
                    />
                    <label for="password" className="form-label-signup">password</label>
                </div>
                <button type="submit" className="signup-button">Enter</button>
            </form>
            {error && (
              <div>
                <h2>
                  Please make sure all the fields are filled in
                </h2>
              </div>
            )}
        </main>
        </body>
    )
}

export default SignUp;