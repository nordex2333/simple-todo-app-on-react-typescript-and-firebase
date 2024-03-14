import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { loginUser } from '../../utils/auth';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      await loginUser(email, password);
      navigate('/todo-list');
    } catch (error) {
      setError('Failed to log in. Please check your credentials.');
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Login</h2>
        {error && <p className="mb-4 text-center text-red-500">{error}</p>}
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
        <button
          onClick={goToRegister}
          className="mt-4 text-blue-500 hover:text-blue-700"
        >
          Go to Register
        </button>
      </div>
    </div>
  );
};