import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './Assets/Login.css';
import authApi from '../../Services/authApi';
import { persistToken } from '../../redux/authSlice'; // persistToken'ı import ediyoruz
import { AppDispatch } from '../../redux/store';

 
const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Login formu gönderildiğinde yapılacak işlem
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setError('Lütfen tüm alanları doldurun!');
    } else {
      setError('');
      try {
        // authApi'yi kullanarak login işlemi
        const response = await authApi.Login({ email, password });
        if (response.token) {
          console.log(response.token);

          // Redux'a token'ı kaydediyoruz
          dispatch(persistToken(response.token)); // PersistToken'ı çağırıyoruz
          navigate('/');
         
        } else {
          setError('Giriş yaparken bir hata oluştu!');
        }
      } catch (error) {
        setError('E-posta veya şifre hatalı!');
      }
    }
  };

  // Kayıt sayfasına yönlendirme fonksiyonu
  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="email">E-Mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Set E-Mail"
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Set password"
              required
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>

        <div className="register-link">
          <p>Don't have an account?<span onClick={handleRegisterRedirect} className="register-link-btn">Sign up</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
