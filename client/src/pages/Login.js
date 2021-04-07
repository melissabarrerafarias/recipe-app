import React from 'react';

const Login = () => {

    return (
        <main className="container">
            <h1>Login</h1>
            <form>
                <div className="mb-3">
                    <input placeholder="username" class="form-control" />
                </div>
                <div class="mb-3">
                    <input placeholder="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </main>
    )
}

export default Login; 