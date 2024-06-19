// // LoginValidation.jsx
// import React, { useState } from 'react';

// function LoginValidation({ onSignupClick }) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'username') {
//       setUsername(value);
//     } else if (name === 'password') {
//       setPassword(value);
//     }
//   };

//   const handleLoginSubmit = (e) => {
//     e.preventDefault();
//     // Validasi username dan password
//     if (username.trim() === '' || password.trim() === '') {
//       setError('Username and password are required');
//     } else {
//       // Lakukan login
//       // Misalnya, panggil fungsi login di sini
//       // handleLogin(username, password);
//     }
//   };

//   const handleSignupClick = () => {
//     onSignupClick();
//   };

//   return (
//     <div className="flex justify-center items-center bg-primary min-h-screen">
//       <div className="bg-white p-8 rounded-lg w-96">
//         <h2 className="text-2xl font-bold mb-4">Login</h2>
//         <form onSubmit={handleLoginSubmit}>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               name="username"
//               value={username}
//               onChange={handleInputChange}
//               className="mt-1 p-2 border rounded-md w-full"
//               placeholder="Enter Email"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={password}
//               onChange={handleInputChange}
//               className="mt-1 p-2 border rounded-md w-full"
//               placeholder="Enter Password"
//             />
//           </div>
//           <button className="bg-green-500 text-white font-medium py-2 px-4 rounded-md hover:bg-green-600">Log in</button>
//           <p className="text-sm mt-2">By logging in, you agree to our terms and policy</p>
//           {error && <p className="text-red-500">{error}</p>}
//           <button
//             className="border border-gray-300 mt-4 text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-50"
//             onClick={handleSignupClick}
//           >
//             Create Account
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default LoginValidation;
