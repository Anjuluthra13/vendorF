import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './Venderprofile.css';

const Profile = () => {
    const [userDetails, setUserDetails] = useState(null);
    const history = useHistory();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem('userDetails'));
                
                if (!storedUser || !storedUser.email) {
                    toast.error('User details not found. Please log in.');
                    history.push('/vendorlogin');
                    return;
                }

                // Fetch the user profile from the backend
                const response = await axios.get(`https://vendorb-production.up.railway.app/api/profile?email=${storedUser.email}`);

                if (response.status === 200) {
                    setUserDetails(response.data);
                }
            } catch (err) {
                console.error('Error fetching profile:', err);
                toast.error('Failed to fetch user profile');
            }
        };

        fetchUserProfile();
    }, [history]);

    const handleComplete = () => {
        history.push('/vendorcomplete');
    };

    const handlePending = () => {
        history.push('/vendororder');
    };

    // Logout function
    const handleLogout = () => {
        // Clear user details from localStorage
        localStorage.removeItem('userDetails');
        // Redirect to login page
        history.push('/vendorlogin');
        toast.success('Logged out successfully'); // Optional: Notify user of successful logout
    };

    return (
        <div className="profile-container">
            <h2 className="profile-header">Vendor Profile</h2>
            <div className="profile-details">
                {userDetails ? (
                    <>
                        <p><strong>Name:</strong> {userDetails.name}</p>
                        <p><strong>Age:</strong> {userDetails.age}</p>
                        <p><strong>Service:</strong> {userDetails.service}</p>
                        <p><strong>Phone:</strong> {userDetails.phone}</p>
                        <p><strong>Email:</strong> {userDetails.email}</p>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <h1><center>Orders</center></h1>
            <div className="profile-actions">
                <button className="btn-complete" onClick={handleComplete}>Completed Orders</button>
                <button className="btn-pending" onClick={handlePending}>Pending Orders</button>
            </div>
            <button className="btn-logout" onClick={handleLogout}>Logout</button> {/* Logout button */}
            <ToastContainer />
        </div>
    );
};

export default Profile;
