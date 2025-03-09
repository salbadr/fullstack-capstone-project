import React, { useEffect, useState } from 'react';
import './LoginPage.css'
import { urlConfig } from '../../config';
import { useAppContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setIsLoggedIn } = useAppContext();
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const token = sessionStorage.getItem('auth-token');
    useEffect(() => {
        if (token) {
            navigate('/app/');
        }
    }, [navigate, token])


    function handleLogin(e) {
        e.preventDefault();

        const [emailInput, passwordInput] = [...e.target]
        const body = {
            email: emailInput.value,
            password: passwordInput.value
        }
      
        fetch(`${urlConfig.backendUrl}/auth/login`, {
            method: 'POST', body: JSON.stringify(body), headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
            }
        })
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
                    sessionStorage.setItem('name', data.name);
                    setIsLoggedIn(true);

                    navigate('/app/')
                }
            })
            .catch(e => {
                setEmail('');
                setPassword('');
                setError(e.message)
            })

    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-6">
                    <div className="login-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Login</h2>
                        {error ?
                            <div className="alert alert-danger" role="alert">
                                <strong>Oh snap! </strong>{error}
                            </div>
                            : ''}
                        <form onSubmit={(e) => handleLogin(e)}>

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

