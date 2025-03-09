import React, { useState } from 'react';
import './RegisterPage.css'
import { urlConfig } from '../../config';
import { useAppContext} from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom'

export default function RegisterPage() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setIsLoggedIn } = useAppContext();
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    function handleRegister(e) {
        e.preventDefault();
        const [firstNameInput, lastNameInput, emailInput, passwordInput] = [...e.target]
        const body = {
            firstname: firstNameInput.value,
            lastname: lastNameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        }
        fetch(`${urlConfig.backendUrl}/auth/register`, { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Something went wrong');
                }
                return res.json()
            })
            .then(data => {
                if (data.token) {
                    sessionStorage.setItem('auth-token', data.token);
                    sessionStorage.setItem('email', data.email);
                    sessionStorage.setItem('name', firstNameInput.value);
                    setIsLoggedIn(true);

                    navigate('/app/')
                }
            })
            .catch(e => {
                setError(e.message)
            })

    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-6">

                    <div className="register-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Register</h2>
                        {error ?
                            <div className="alert alert-danger" role="alert">
                                <strong>Oh snap!</strong>{error}
                            </div>
                            : ''}
                        <form onSubmit={(e) => handleRegister(e)}>
                            <div className="form-group mb-4">
                                <label className="form-label" htmlFor="firstname">First Name</label>
                                <input
                                    className="form-control"
                                    id='firstname'
                                    name='firstname'
                                    type='text'
                                    placeholder='Enter your first name'
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)} />
                            </div>

                            <div className="form-group mb-4">
                                <label className="form-label" htmlFor="lastname">Last Name</label>
                                <input
                                    className="form-control"
                                    id='lastname'
                                    name='lastname'
                                    type='text'
                                    value={lastName}
                                    placeholder='Enter your last name'
                                    onChange={(e) => setLastName(e.target.value)} />
                            </div>

                            <div className="form-group mb-4">
                                <label className="form-label" htmlFor="email">Email</label>
                                <input
                                    className="form-control"
                                    id='email'
                                    name='email'
                                    type='email'
                                    required
                                    value={email}
                                    placeholder='Enter your email'
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div className="form-group mb-4">
                                <label className="form-label" htmlFor="password">Password</label>
                                <input
                                    className="form-control"
                                    id='password'
                                    name='password'
                                    type='password'
                                    required
                                    value={password}
                                    placeholder='Enter your password'
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <input type='submit' value='Register' className='mt-4 btn btn-primary' />
                        </form>
                        <p className="mt-4 text-center">
                            Already a member? <Link className="text-primary" to="/app/login">Login</Link>

                        </p>
                    </div>

                </div>

            </div>
        </div>)
}

