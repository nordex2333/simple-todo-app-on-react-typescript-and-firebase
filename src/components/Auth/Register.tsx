import { useState } from 'react';
import { Link } from 'react-router-dom';

import { registerUser } from '../../utils/auth';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async () => {
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      await registerUser(email, password);
      setSuccess('Registration successful!');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error("Registration error:", error);
      if ((error as any).code === 'auth/email-already-in-use') {
        setError('The email address is already in use by another account.');
      } else {
        setError('Failed to register. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Register</h2>
        {error && <p className="mb-4 text-center text-red-500">{error}</p>}
        {success && <p className="mb-4 text-center text-green-500">{success}</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mb-4 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mb-4 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleRegister}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
        >
          Register
        </button>
        <p className="mt-4 text-center">
          Already registered? <Link to="/login" className="text-blue-500 hover:text-blue-700">Please Login</Link>
        </p>
      </div>
    </div>
  );
};