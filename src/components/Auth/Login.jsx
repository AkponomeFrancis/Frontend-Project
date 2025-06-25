import React, { useState, useContext } from 'react';
import API from '../../services/api.js';
import { AuthContext } from '../../context/AuthContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post('/login', form);
      login(data.user, data.token);
      navigate('/');
      toast.success("Login successful")
    } catch (err) {
      toast.error('Login failed: ' + err?.response?.data?.message || err.message);
    } finally {
    setLoading(false); 
  }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 px-4 min-h-[60vh] sm:min-h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 sm:p-8 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Login
        </h2>

        <input
          name="email"
          type="email"
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
  type="submit"
  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-semibold flex justify-center items-center gap-2"
  disabled={loading}
>
  {loading && (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
    </svg>
  )}
  {loading ? 'Logging in...' : 'Login'}
</button>

        <p>New User? <Link
          to={`/register`}
          className='text-blue-500 hover:text-blue-700'
        >Register Here</Link></p>
      </form>
    </div>
  );
};

export default Login;
