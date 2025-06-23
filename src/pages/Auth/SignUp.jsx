import React from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import PasswordInput from '../../components/input/PasswordInput';
import loginImage from '../../assets/images/bg-images.png';

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axiosInstance.post('/create-account', {
        "fullName":name,
        "email" :  email,
        "password": password,
      });

      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        navigate('/dashboard');
      } else {
        setError("Réponse inattendue du serveur");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la création du compte");
      console.error('Erreur:', err.response?.data || err);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-cyan-50 font-poppins">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-lg shadow-sm overflow-hidden h-[80vh]">
        
        {/* Partie image */}
        <div className="md:w-1/2 relative bg-gray-900">
          <img
            src={loginImage}
            alt="Travel scenery"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
            <h2 className="text-3xl font-light mb-2">Join the</h2> <br/>Adventure 
            <p className="text-[15px] text-white leading-6 pr-7 mt-4">
             Create an account to start documenting your travels and preserving your memories in your personal travel journal.
            </p>
            <div className="mt-4 text-xs text-gray-400">
              0:57 / 1:85:25 • Login screen UI
            </div>
          </div>
        </div>

        {/* Partie formulaire */}
        <div className="md:w-1/2 p-10 flex items-center justify-center bg-white">
          <div className="w-full max-w-xs">
            <h1 className="text-2xl font-light text-gray-800 mb-8 text-center">SignUp</h1>

            <form onSubmit={handleSignup} className="space-y-6">
              {/* Full Name */}
              <div className="border-b border-gray-300 pb-1">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full bg-transparent py-2 text-sm text-gray-800 focus:outline-none placeholder-gray-400"
                  required
                />
              </div>

              {/* Email */}
              <div className="border-b border-gray-300 pb-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full bg-transparent py-2 text-sm text-gray-800 focus:outline-none placeholder-gray-400"
                  required
                />
              </div>

              {/* Password */}
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />

              {/* Bouton Create Account */}
              <button
                type="submit"
                className="w-full bg-cyan-600 text-white py-3 text-sm rounded hover:bg-cyan-700 transition-colors mt-4"
              >
                CREATE ACCOUNT
              </button>

              {/* Message d'erreur */}
              {error && (
                <div className="text-red-500 text-center text-sm mt-2">
                  {error}
                </div>
              )}

              {/* Lien vers Login */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-cyan-600 hover:text-cyan-800 text-xs font-medium underline hover:no-underline"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
