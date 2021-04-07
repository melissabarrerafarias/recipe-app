import React, { useState } from 'react';
import { useMutation } from "@apollo/react-hooks";
import { ADD_USER } from "../utils/mutations"; //mutation for adding a new user
import Auth from '../utils/auth';//authentication

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
        <main className="container">
            <h1>Sign Up</h1>
            <form onSubmit={onFormSubmit}>
                <div className="mb-3">
                    <input
                        placeholder="username"
                        class="form-control"
                        name="username"
                        type="username"
                        id="username"
                        value={formState.username}
                        onChange={onFormChange} />
                </div>
                <div class="mb-3">
                    <input
                        placeholder="password"
                        class="form-control"
                        name="password"
                        type="password"
                        id="password"
                        value={formState.password}
                        onChange={onFormChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Enter</button>
            </form>
            {error && (
              <div>
                <h2>
                  Please make sure all the fields are filled in
                </h2>
              </div>
            )}
        </main>
    )
}

export default SignUp;