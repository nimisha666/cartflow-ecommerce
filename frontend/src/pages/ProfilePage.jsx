import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEditProfileMutation } from '../features/auth/authApi';

const ProfilePage = () => {
    const { user } = useSelector((state) => state.auth);
    const [editProfile] = useEditProfileMutation();

    const [activeTab, setActiveTab] = useState('personal');
    const [editable, setEditable] = useState(false);
    const [formData, setFormData] = useState({
        username: user?.username || '',  // ✅ Changed "name" to "username"
        email: user?.email || '',
        mobile: user?.mobile || '',
        gender: user?.gender || ''
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const updatedUser = await editProfile(formData).unwrap();
            setFormData({
                username: updatedUser.username,  // ✅ Changed "name" to "username"
                email: updatedUser.email,
                mobile: updatedUser.mobile,
                gender: updatedUser.gender
            });
            setEditable(false);
        } catch (error) {
            console.error("Failed to update profile:", error);
        }
    };

    const handleCancel = () => {
        setFormData({
            username: user?.username || '',  // ✅ Changed "name" to "username"
            email: user?.email || '',
            mobile: user?.mobile || '',
            gender: user?.gender || ''
        });
        setEditable(false);
    };

    const handleLogout = () => {
        console.log("Logout clicked"); // Implement logout functionality
    };

    if (!user) {
        return <div className="text-center p-6">Please log in to view your profile.</div>;
    }

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 flex">
            <div className="w-1/4 border-r pr-4">
                <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
                <div className="flex flex-col space-y-2">
                    <button className={`px-4 py-2 text-left ${activeTab === 'personal' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`} onClick={() => setActiveTab('personal')}>Personal Info</button>
                    <button className={`px-4 py-2 text-left ${activeTab === 'address' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`} onClick={() => setActiveTab('address')}>Address</button>
                    <button className={`px-4 py-2 text-left ${activeTab === 'orders' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`} onClick={() => setActiveTab('orders')}>Order History</button>
                    <button className="px-4 py-2 text-red-500 text-left" onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div className="w-3/4 pl-4">
                {activeTab === 'personal' && (
                    <div>
                        <label className="block">Username:
                            <input type="text" name="username" value={formData.username} onChange={handleInputChange} disabled={!editable} className="w-full border p-2 rounded" />
                        </label>
                        <label className="block mt-2">Email:
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} disabled={!editable} className="w-full border p-2 rounded" />
                        </label>
                        <label className="block mt-2">Mobile Number:
                            <input type="text" name="mobile" value={formData.mobile} onChange={handleInputChange} disabled={!editable} className="w-full border p-2 rounded" />
                        </label>
                        <label className="block mt-2">Gender:
                            <select name="gender" value={formData.gender} onChange={handleInputChange} disabled={!editable} className="w-full border p-2 rounded">
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </label>
                        <div className="mt-4">
                            {editable ? (
                                <>
                                    <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
                                    <button onClick={handleCancel} className="ml-2 px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
                                </>
                            ) : (
                                <button onClick={() => setEditable(true)} className="px-4 py-2 bg-green-500 text-white rounded">Edit</button>
                            )}
                        </div>
                    </div>
                )}
                {activeTab === 'address' && (
                    <div>
                        <p>No address information available.</p>
                    </div>
                )}
                {activeTab === 'orders' && (
                    <div>
                        <p>No order history available.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
