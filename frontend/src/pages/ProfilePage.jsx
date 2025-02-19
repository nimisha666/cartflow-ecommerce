import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEditProfileMutation } from '../features/auth/authApi';
import { logout } from '../features/auth/authSlice';

const ProfilePage = () => {
    const dispatch = useDispatch();
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
            const updatedUser = await editProfile(formData).unwrap();
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
        setAddressData((prevAddresses) => [...prevAddresses, newAddress]);
        setNewAddress({
            name: '',
            mobile: '',
            pin: '',
            locality: '',
            address: '',
            city: '',
            state: '',
            landmark: ''
        });
        setShowAddressForm(false);
    };

    const handleDeleteAddress = (index) => {
        setAddressData((prevAddresses) => prevAddresses.filter((_, i) => i !== index));
    };

    const handleLogout = () => {
        if (dispatch) {
            dispatch(logout());
        } else {
            console.error("Dispatch is not available.");
        }
    };

    if (!user) {
        return <div className="text-center p-6">Please log in to view your profile.</div>;
    }

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 flex">
            <div className="w-1/4 border-r pr-4">
                <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
                <div className="flex flex-col space-y-2">
                    <button className={`px-4 py-2 text-left ${activeTab === 'personal' ? 'bg-red-500 text-white' : 'bg-gray-100'}`} onClick={() => setActiveTab('personal')}>Personal Info</button>
                    <button className={`px-4 py-2 text-left ${activeTab === 'address' ? 'bg-red-500 text-white' : 'bg-gray-100'}`} onClick={() => setActiveTab('address')}>Address</button>
                    <button className={`px-4 py-2 text-left ${activeTab === 'orders' ? 'bg-red-500 text-white' : 'bg-gray-100'}`} onClick={() => setActiveTab('orders')}>Order History</button>
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
                        <div className="mt-4">
                            {editable ? (
                                <>
                                    <button onClick={handleSave} className="px-4 py-2 bg-red-500 text-white rounded">Save</button>
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
                        {addressData.map((address, index) => (
                            <div key={index} className="border p-2 rounded mb-2">
                                <p><span className="font-bold">Name:</span> {address.name}</p>
                                <p><span className="font-bold">Mobile No:</span> {address.mobile}</p>
                                <p><span className="font-bold">Address:</span>{address.address} {address.locality}, {address.city}, {address.pin}, {address.state}</p>
                            </div>
                        ))}
                        {showAddressForm ? (
                            <div>
                                <label className="block">Name:
                                    <input type="text" name="name" placeholder="Name" value={newAddress.name} onChange={handleAddressChange} className="border p-2 rounded w-full" />
                                </label>
                                <label className="block mt-2">Mobile No.:
                                    <input type="text" name="mobile" placeholder="Mobile" value={newAddress.mobile} onChange={handleAddressChange} className="border p-2 rounded w-full" />
                                </label>
                                <label className="block mt-2">PIN:
                                    <input type="text" name="pin" placeholder="PIN" value={newAddress.pin} onChange={handleAddressChange} className="border p-2 rounded w-full" />
                                </label>
                                <label className="block mt-2">Locality:
                                    <input type="text" name="locality" placeholder="Locality" value={newAddress.locality} onChange={handleAddressChange} className="border p-2 rounded w-full" />
                                </label>
                                <label className="block mt-2">Address (Area and Street):
                                    <input type="text" name="address" placeholder="Address (Area and Street)" value={newAddress.address} onChange={handleAddressChange} className="border p-2 rounded w-full" />
                                </label>
                                <label className="block mt-2">City:
                                    <input type="text" name="city" placeholder="City" value={newAddress.city} onChange={handleAddressChange} className="border p-2 rounded w-full" />
                                </label>
                                <label className="block mt-2">State:
                                    <input type="text" name="state" placeholder="State" value={newAddress.state} onChange={handleAddressChange} className="border p-2 rounded w-full" />
                                </label>
                                <label className="block mt-2">Landmark:
                                    <input type="text" name="landmark" placeholder="Landmark" value={newAddress.landmark} onChange={handleAddressChange} className="border p-2 rounded w-full" />
                                </label>

                                <button onClick={handleSaveAddress} className="px-4 py-2 mt-2 bg-red-500 text-white rounded">Save</button>
                                <button onClick={() => setShowAddressForm(false)} className="ml-2 px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
                            </div>
                        ) : (
                            <button onClick={() => setShowAddressForm(true)} className="px-4 py-2 bg-green-500 text-white rounded mt-4">Add Address</button>
                        )}
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
