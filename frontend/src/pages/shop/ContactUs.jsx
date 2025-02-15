import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const ContactUs = () => {
    const navigate = useNavigate(); // ✅ Initialize useNavigate

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            setError("All fields are required!");
            return;
        }

        // ✅ Show alert and redirect to home after "OK"
        alert("✅ Message Sent Successfully!");
        navigate("/"); // ✅ Redirect to Home Page

        // ✅ Clear form & error state
        setFormData({ name: "", email: "", message: "" });
        setError("");
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-lg">
                <h2 className="text-3xl font-bold text-center text-red-800">📩 Contact Us</h2>
                <p className="text-gray-600 text-center mt-2">We'd love to hear from you!</p>

                {error && <p className="text-red-500 text-center mt-4">{error}</p>}

                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block font-semibold text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-red-400"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-red-400"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700">Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mt-1 h-28 focus:outline-none focus:ring-2 focus:ring-red-400"
                            placeholder="Write your message..."
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="bg-red-600 w-full text-white py-2 rounded-md hover:bg-red-700 transition"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
