import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom'; // Redirect yerine Navigate import ediyoruz
import authApi from '../Services/authApi';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Başlangıçta null

  // Token doğrulama işlemi
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await authApi.tokenVerify(); // Token doğrulama
        if (response) {
          setIsAuthenticated(true); // Eğer token geçerli ise, isAuthenticated true yapılır
        } else {
          setIsAuthenticated(false); // Token geçerli değilse, isAuthenticated false yapılır
        }
      } catch (err) {
        setIsAuthenticated(false); // Hata durumunda da false yapılır
      }
    };

    verifyToken(); // token doğrulama işlemini başlat
  }, []);

  // Eğer doğrulama süreci devam ediyorsa (isAuthenticated null)
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Yükleniyor mesajı gösterilebilir
  }

  // Eğer doğrulama başarısızsa kullanıcıyı Login sayfasına yönlendiriyoruz
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Doğrulama başarılıysa render ediyoruz
  return <>{children}</>;
};

export default ProtectedRoute;
