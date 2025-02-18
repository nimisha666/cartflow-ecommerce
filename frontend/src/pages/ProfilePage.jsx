import React from 'react';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
    const { user } = useSelector((state) => state.auth);

    if (!user) {
        return <div className="text-center p-6">Please log in to view your profile.</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
            <div className="flex flex-col items-center">
                <img
                    src={user?.profileImage || 'https://via.placeholder.com/150'}
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full mb-4"
                />
                <p className="text-lg font-medium">Username: {user?.username}</p>
                <p className="text-gray-600">Email: {user?.email}</p>
                <p className="text-gray-600">Role: {user?.role}</p>
            </div>
        </div>
    );
};

export default ProfilePage;
