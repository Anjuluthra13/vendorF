import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import this to apply toastify styles
import './Venderprofile.css';

const Register = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState(''); // Keep as string
    const [service, setService] = useState('');
    const [phone, setPhone] = useState(''); // Keep as string initially, convert before sending
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory(); // Use history for navigation

    const handleRegister = async (e) => {
        e.preventDefault();

        // Basic validation for inputs
        if (!name || !age || !service || !phone || !email || !password) {
            toast.error('All fields are required.');
            return;
        }

        // Regex for basic phone number validation
        const phoneRegex = /^[0-9]{10}$/; // Assuming 10-digit phone numbers
        if (!phoneRegex.test(phone)) {
            toast.error('Phone number must be 10 digits.');
            return;
        }

        try {
            const response = await axios.post('https://vendorb-production.up.railway.app/api/register', { 
                name, 
                age, 
                service, 
                phone: Number(phone), // Convert to a number for the API
                email, 
                password 
            });

            if (response.status === 201) {
                toast.success('User registered successfully');
                // Redirect user to login page after successful registration
                history.push('/');
            }
        } catch (err) {
            if (err.response) {
                // Server responded with a status other than 2xx
                if (err.response.status === 400) {
                    toast.error(err.response.data.message || 'Bad request. Please check your input.');
                } else if (err.response.status === 500) {
                    toast.error('Server error. Please try again later.');
                } else {
                    toast.error(`Error: ${err.response.status}. Please try again.`);
                }
            } else if (err.request) {
                // Request was made, but no response was received
                toast.error('No response from the server. Please check your network connection.');
            } else {
                // Something else caused the error
                toast.error('An unknown error occurred. Please try again.');
            }

            console.error('Error during registration:', err); // Log error for debugging
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
                        <option value="Plumbing">Plumbing</option> {/* Added Plumbing option */}
                    </select>
                </div>
                <div className="form-group mb-3">
                    <input
                        type="tel" // Changed to 'tel' for better mobile experience
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
                Already have an account? <Link to="/">Login here</Link>
            </p>
            <ToastContainer />
        </div>
    );
};

export default Register;
