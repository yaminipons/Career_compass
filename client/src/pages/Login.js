import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
  setLoading(true);
  setError('');
  try {
    const res = await API.post('/auth/login', form);
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('name', res.data.name);

    // Redirect based on profile completion
    if (res.data.profile_complete) {
      navigate('/dashboard');
    } else {
      navigate('/setup');
    }
  } catch (err) {
    setError(err.response?.data?.detail || 'Something went wrong');
  }
  setLoading(false);
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-indigo-600 mb-2">Welcome Back!</h1>
        <p className="text-gray-500 mb-6">Login to see your career recommendations</p>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              placeholder="john@gmail.com"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Your password"
              value={form.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        <p className="text-center mt-4">
          <button onClick={() => navigate('/')} className="text-sm text-gray-400 hover:text-indigo-500 transition">
            ← Back to Home
          </button>
        </p>
      </div>
    </div>
  );
}