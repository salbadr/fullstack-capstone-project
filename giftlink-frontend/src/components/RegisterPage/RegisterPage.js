import React, { useState } from 'react';
import './RegisterPage.css'

export default function RegisterPage() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleRegister(e) {
        e.preventDefault();
        alert('Register');
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="register-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Register</h2>
                        <form  onSubmit={(e) => handleRegister(e)}>
                        <div class="form-group mb-4">
                            <label className="form-label" for="firstname">First Name</label>
                            <input
                                class="form-control"
                                id='firstname'
                                name='firstname'
                                type='text'
                                placeholder='Enter your first name'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)} />
                        </div>

                        <div class="form-group mb-4">
                            <label className="form-label" for="lastname">Last Name</label>
                            <input
                                class="form-control"
                                id='lastname'
                                name='lastname'
                                type='text'
                                value={lastName}
                                placeholder='Enter your last name'
                                onChange={(e) => setLastName(e.target.value)} />
                        </div>

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

                        <input type='submit' value='Register' className='mt-4 btn btn-primary'/>
                        </form>
                        <p className="mt-4 text-center">
                            Already a member? <a href="/app/login" className="text-primary">Login</a>
                        </p>
                    </div>
                </div>

            </div>
        </div>)
}

