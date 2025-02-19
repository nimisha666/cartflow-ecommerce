import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEditProfileMutation } from '../features/auth/authApi';

const ProfilePage = () => {
    const { user } = useSelector((state) => state.auth);
    const [editProfile] = useEditProfileMutation();

    const [activeTab, setActiveTab] = useState('personal');
    const [editable, setEditable] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.username || '',
        email: user?.email || '',
        mobile: user?.mobile || '',
        gender: user?.gender || ''
    });

    const [showAddressForm, setShowAddressForm] = useState(false);
    const [addressData, setAddressData] = useState([]);
    const [newAddress, setNewAddress] = useState({
        name: '',
        mobile: '',
        pin: '',
        locality: '',
        address: '',
        city: '',
        state: '',
        landmark: ''
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddressChange = (e) => {
        setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const updatedUser = await editProfile(formData).unwrap(); // Update backend data
            setFormData({
                name: updatedUser.username,
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
            name: user?.username || '',
            email: user?.email || '',
            mobile: user?.mobile || '',
            gender: user?.gender || ''
        });
        setEditable(false);
    };

    const handleSaveAddress = () => {
        setAddressData([...addressData, newAddress]);
        setNewAddress({ name: '', mobile: '', pin: '', locality: '', address: '', city: '', state: '', landmark: '' });
        setShowAddressForm(false);
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
                        <label className="block">Name:
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} disabled={!editable} className="w-full border p-2 rounded" />
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
                    </div>
                )}
                {activeTab === 'address' && (
                    <div>
                        {addressData.map((address, index) => (
                            <p key={index}>{address.name}, {address.mobile}, {address.city}, {address.state}</p>
                        ))}
                        {showAddressForm ? (
                            <div className="space-y-2">
                                <input type="text" name="name" placeholder="Name" value={newAddress.name} onChange={handleAddressChange} className="border p-2 rounded w-full" />
                                <input type="text" name="mobile" placeholder="Mobile" value={newAddress.mobile} onChange={handleAddressChange} className="border p-2 rounded w-full" />
                                <input type="text" name="pin" placeholder="PIN" value={newAddress.pin} onChange={handleAddressChange} className="border p-2 rounded w-full" />
                                <input type="text" name="locality" placeholder="Locality" value={newAddress.locality} onChange={handleAddressChange} className="border p-2 rounded w-full" />
                                <input type="text" name="address" placeholder="Address (Area and Street)" value={newAddress.address} onChange={handleAddressChange} className="border p-2 rounded w-full" />
                                <input type="text" name="city" placeholder="City" value={newAddress.city} onChange={handleAddressChange} className="border p-2 rounded w-full" />
                                <input type="text" name="state" placeholder="State" value={newAddress.state} onChange={handleAddressChange} className="border p-2 rounded w-full" />
                                <input type="text" name="landmark" placeholder="Landmark" value={newAddress.landmark} onChange={handleAddressChange} className="border p-2 rounded w-full" />
                                <button onClick={handleSaveAddress} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
                                <button onClick={() => setShowAddressForm(false)} className="ml-2 px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
                            </div>
                        ) : (
                            <button onClick={() => setShowAddressForm(true)} className="px-4 py-2 bg-green-500 text-white rounded mt-4">Add Address</button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;