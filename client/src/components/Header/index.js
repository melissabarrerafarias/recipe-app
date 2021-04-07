import React from 'react';
import "./header.css";

const Header = () => {
    return (
        <main>
            <div class="header">
                <a href="/" class="logo">Recipe App</a> {/*change to actual name once chosen*/}
                <div class="header-right">
                    <a class="item" href="/upload">Upload</a>
                    <a className="item" id="login-id" name="login" href="/login">Login</a>
                    <a className="item" id="signup-id" name="signup" href="/signup">Signup</a>

                </div>
            </div>
        </main>
    )
}

export default Header;