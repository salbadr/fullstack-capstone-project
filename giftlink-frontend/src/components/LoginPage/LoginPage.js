import React, { useState } from 'react';
import './LoginPage.css'

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin(e) {
        e.preventDefault();
        alert('Login');
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="login-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Login</h2>
                        <form onSubmit={(e) => handleLogin(e)}>

                            <div class="form-group mb-4">
                                <label className="form-label" for="email">Email</label>
                                <input
                                    class="form-control"
                                    id='email'
                                    name='email'
                                    type='email'
                                    required
                                    value={email}
                                    placeholder='Enter your email'
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div class="form-group mb-4">
                                <label className="form-label" for="password">Password</label>
                                <input
                                    class="form-control"
                                    id='password'
                                    name='password'
                                    type='password'
                                    required
                                    value={password}
                                    placeholder='Enter your password'
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <input value='Login' type='submit' className='mt-4 btn btn-primary' />
                        </form>
                        <p className="mt-4 text-center">
                            New here? <a href="/app/register" className="text-primary">Register Here</a>
                        </p>
                    </div>
                </div>

            </div>
        </div>)
}

