import React from 'react';
import Auth from "../../utils/auth"; //function to logout
import "./header.css";


const Header = () => {
    const logout = (e) => {
        e.preventDefault();
        Auth.logout();
    };

    return (
        <main>
            <div class="header">
                <a href="/" class="logo">Recipe App</a> {/*change to actual name once chosen*/}
                <div class="header-right">
                    {Auth.isLoggedIn() ? ( //if user is logged in
                        <>
                            <a className="item" href='/upload'>Upload</a>
                            <a className="item" id="logout" href="/" onClick={logout}>Logout</a>
                        </>
                    ) : (
                        //else - render
                        <>
                            <a className="item" id="login-id" name="login" href="/login">Login</a>
                            <a className="item" id="signup-id" name="signup" href="/signup">Signup</a>
                        </>
                    )}

                </div>
            </div>
        </main>
    )
}

export default Header;