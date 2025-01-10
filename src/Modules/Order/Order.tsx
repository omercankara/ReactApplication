import React, { useEffect, useState } from 'react';
import './Assets/Order.css'; //

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]); // Siparişlerin tutulacağı state

  // localStorage'dan siparişleri almak
  useEffect(() => {
    const storedOrders = localStorage.getItem('orders'); // 
    if (storedOrders) {
      // Eğer localStorage'da siparişler varsa, JSON.parse ile alıp state'e set etme işlemi
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  return (
    <div className="orders-container">
      <h2 className="orders-title">My orders</h2>
      
      {/* Eğer sipariş yoksa bir mesaj göster */}
      {orders.length === 0 ? (
        <p className="no-orders">You don't have any orders yet.</p>
      ) : (
        <div className="orders-list">
          <ul className="orders-list-ul">
            {orders.map((order, index) => {
              // Siparişin toplam fiyatını hesaplatma işlemim
              const totalPrice = (order.price * order.quantity).toFixed(2); // Fiyat * quantity ve 2 ondalıklı kesir
              return (
                <li key={index} className="order-item">
                  <div className="order-image">
                    {/* Siparişin görselini ekleme işlemim */}
                    <img src={order.showcase_image} alt={order.name} className="order-img" />
                  </div>
                  <div className="order-details">
                    <strong className="order-name">{order.name}</strong>
                    <p className="order-date">Date {order.createdAt}</p>
                    <p className="order-quantity">Quantity: {order.quantity}</p>
                    <p className="order-price">Total Price:  {totalPrice} ₺</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Orders;
