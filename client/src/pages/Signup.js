import React from 'react';

const SignUp = () => {

    return (
        <main className="container">
            <h1>Sign Up</h1>
            <form>
                <div className="mb-3">
                    <input placeholder="username" class="form-control" />
                </div>
                <div class="mb-3">
                    <input placeholder="password" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </main>
    )
}

export default SignUp; 