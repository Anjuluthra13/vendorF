import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './Venderprofile.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password });
    
            // If login is successful
            if (response.status === 200) {
                toast.success(response.data.message);
                
                // Save user data (excluding sensitive information) to local storage
                localStorage.setItem('userDetails', JSON.stringify(response.data.vendor));
    
                // Use history.push to redirect after successful login
                history.push('/vendorprofile');
            }
        } catch (err) {
            // Log the error for debugging
            console.error(err.response ? err.response.data.message : err.message);
            toast.error(err.response ? err.response.data.message : 'Invalid email or password');
        }
    };

    return (
        <div className="login-container mt-5">
            <form onSubmit={handleLogin} className="login-form w-50 mx-auto">
                <h2 className="form-heading mb-4">Login</h2>
                <div className="form-group mb-3">
                    <input
                        type="email"
                        className="form-input"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <input
                        type="password"
                        className="form-input"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn-submit">Login</button>
            </form>
            <p className="login-link mt-3 text-center">
                Don't have an account? <Link to="/vendorregister">Register here</Link>
            </p>
            <ToastContainer />
        </div>
    );
};

export default Login;
