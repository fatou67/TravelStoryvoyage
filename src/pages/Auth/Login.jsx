import React from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import PasswordInput from '../../components/input/PasswordInput';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const loginImage = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axiosInstance.post('/login', {
        email,
        password,
      });

      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        navigate('/dashboard');
      } else {
        setError("Unexpected server response");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Incorrect email or password");
      console.error('Error:', err.response?.data || err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-50 p-4"> {/* Bleu ciel clair */}
      <div className="flex flex-col md:flex-row w-full max-w-md bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Photo à côté du formulaire (sur desktop) */}
        <div className="hidden md:block md:w-2/5 bg-gray-900">
          <img
            src={loginImage}
            alt="Travel"
            className="w-full h-full object-cover opacity-90"
          />
        </div>

        {/* Formulaire compact */}
        <div className="w-full md:w-3/5 p-5">
          <h1 className="text-lg font-normal text-gray-800 mb-4 text-center">Login</h1>
          
          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded focus:outline-none focus:border-cyan-400"
                required
              />
            </div>

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded focus:outline-none focus:border-cyan-400"
            />

            <button
              type="submit"
              className="w-full bg-cyan-500 text-white py-2 text-xs rounded hover:bg-cyan-600 mt-3"
            >
              LOGIN
            </button>

            {error && (
              <div className="text-red-500 text-xs text-center mt-2">
                {error}
              </div>
            )}

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="text-cyan-600 hover:text-cyan-800 text-xs"
              >
                CREATE ACCOUNT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;