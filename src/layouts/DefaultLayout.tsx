import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { Outlet } from "react-router";
import { clearToken } from "../redux/authSlice";
import { AppDispatch } from '../redux/store';
import "./Assets/DefaultLayout.css";
import { clearProducts } from "../redux/productSlice";
import { clearOrders } from "../redux/orderSlice";

const DefaultLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Çıkış yap fonksiyonu (örneğin, localStorage'dan kullanıcıyı silme)
  const handleLogout = () => {
    dispatch(clearToken());
    dispatch(clearProducts());
    dispatch(clearOrders());
    localStorage.removeItem("orders");
    localStorage.removeItem("totalAmount");
    navigate("/login"); // Anasayfaya yönlendir
  };

  // Hesabım menüsünü açmak ve kapatmak için toggle fonksiyonu
  const toggleAccountMenu = () => {
    setIsAccountMenuOpen(!isAccountMenuOpen);
  };

  return (
    <div className="appContainer">
      <div className="app-menu">
        <div className="left-menu">
          <ul>
            <li onClick={() => navigate("/")}>Home</li>
            
          </ul>
        </div>

        <div className="right-menu">
          <ul>
            <li onClick={() => navigate("/shopping")}>Cart</li>
            <li onClick={toggleAccountMenu}>Account</li>
            {isAccountMenuOpen && (
              <div className="account-menu">
                <ul>
                  <li onClick={() => navigate("/order")}>Order History</li>
                  <li onClick={handleLogout}>Log Out</li>
                </ul>
              </div>
            )}
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
