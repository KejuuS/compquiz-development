import React, { useState } from 'react';
import axios from 'axios';

function Signup({ onLoginClick }) {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
        setErrors({ ...errors, [event.target.name]: '' }); // Clear error when user starts typing
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Memeriksa apakah semua kolom telah diisi
        const newErrors = {};
        if (!values.username) newErrors.username = 'Username is required';
        if (!values.email) newErrors.email = 'Email is required';
        if (!values.password) newErrors.password = 'Password is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Mengirim data ke server jika semua kolom telah diisi
        axios.post('http://localhost:8081/register', values)
            .then(res => {
                console.log("Register Success!!");
                setErrors({}); // Menghapus pesan kesalahan jika berhasil
                window.location.href = '/login';
            })
            .catch(err => {
                if (err.response && err.response.data.error) {
                    setErrors(err.response.data.error);
                } else {
                    setErrors({ form: 'An error occurred. Please try again.' });
                }
            });
    };

    return (
        <div className="flex justify-center items-center bg-primary min-h-screen">
            <div className="bg-white p-8 rounded-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Signup</h2>
                {errors.form && <p className="text-red-500 mb-4">{errors.form}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm text-left font-medium text-gray-700">Username</label>
                        {errors.username && <p className="text-red-500 text-left text-sm mt-1">{errors.username}</p>}
                        <input type="text" name="username" className="mt-1 p-2 border rounded-md w-full" placeholder="Enter Name" onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm text-left font-medium text-gray-700">Email</label>
                        {errors.email && <p className="text-red-500 text-left text-sm mt-1">{errors.email}</p>}
                        <input type="email" name="email" className="mt-1 p-2 border rounded-md w-full" placeholder="Enter Email" onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm text-left font-medium text-gray-700">Password</label>
                        {errors.password && <p className="text-red-500 text-left text-sm mt-1">{errors.password}</p>}
                        <input type="password" name="password" className="mt-1 p-2 border rounded-md w-full" placeholder="Enter Password" onChange={handleChange} />
                    </div>
                    <button type="submit" className="bg-green-500 text-white font-medium py-2 px-4 rounded-md hover:bg-green-600">Sign Up</button>
                    <button type="button" onClick={onLoginClick} className="border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-50 mt-4 ml-4 ">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
