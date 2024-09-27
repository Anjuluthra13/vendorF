import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './Venderprofile.css';

const Register = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [service, setService] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory(); // Use history for navigation

    const handleRegister = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/api/register', { 
                name, age, service, phone, email, password
            });

            if (response.status === 201) {
                toast.success('User registered successfully');
                // Redirect user to login page after successful registration
                history.push('/vendorlogin');
            }
        } catch (err) {
            toast.error('Registration failed');
            console.error(err); // Log error for debugging
        }
    };

    return (
        <div className="register-container mt-5">
            <form onSubmit={handleRegister} className="register-form w-50 mx-auto">
                <h2 className="form-heading mb-4">Register</h2>
                <div className="form-group mb-3">
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <select
                        className="form-input"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        required
                    >
                        <option value="">Select Service</option>
                        <option value="Driver">Driver</option>
                        <option value="HomeMaid">HomeMaid</option>
                        <option value="Electrician">Electrician</option>
                        <option value="Cleaning">Cleaning</option>
                        <option value="Babysitter">Babysitter</option>
                    </select>
                </div>
                <div className="form-group mb-3">
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
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
                <button type="submit" className="btn-submit">Register</button>
            </form>
            <p className="login-link mt-3 text-center">
                Already have an account? <Link to="/vendorlogin">Login here</Link>
            </p>
            <ToastContainer />
        </div>
    );
};

export default Register;
