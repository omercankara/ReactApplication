import React, { useState } from 'react';
import './Assets/Register.css'; // Stil dosyasını import edebiliriz.
import authApi from '../../Services/authApi'; // authApi'yi import ediyoruz
import { useNavigate } from 'react-router-dom'; // Sayfalar arasında yönlendirme yapmak için useNavigate kullanıyoruz
import { toast } from 'react-toastify'; // Toast bildirimini import ediyoruz
import 'react-toastify/dist/ReactToastify.css'; // Toast stilini import ediyoruz

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading durumu ekledik
  const navigate = useNavigate(); // Sayfa yönlendirmesi için

  // Form gönderildiğinde yapılacak işlem
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Sayfanın yenilenmesini engelle
    if (password.length < 8) {
      // Parola 8 karakterden kısa ise
      toast.error('Your password must consist of at least 8 characters'); // Toast ile uyarı gösteriyoruz
      return; // Hata durumunda işlem durduruluyor
    }

    setLoading(true); // Yükleniyor durumu başlatıyoruz
    try {
      // API çağrısını yapıyoruz
      const response = await authApi.createUser({ email, password });
      console.log(response)

      // API'den başarılı bir cevap geldiyse login sayfasına yönlendir
      if (response.message) {
        toast.success('Successfully registered');
        navigate('/login');
      } else {
        // Eğer response status 200 değilse hata ver
        throw new Error('Kayıt işlemi başarısız oldu!');
      }
    } catch (error) {
      toast.warning('Already have an e mail'); // Toast ile uyarı gösteriyoruz

    } finally {
      setLoading(false); // Yükleniyor durumunu bitiriyoruz
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };


  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="email">E-Mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Set E Mail"
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
          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
          <div className="register-link">
            <p><span onClick={handleLoginRedirect} className="register-link-btn">Login</span></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
