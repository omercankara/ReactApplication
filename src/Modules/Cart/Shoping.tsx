import React, { useState } from 'react';
import ShoppingCart from './Components/appCart';
import OrderCart from "./Components/appOrder";
import './Assets/deneme.css';

const Shoping: React.FC = () => {
  // Toplam tutarı tutacak state
  const [totalAmount, setTotalAmount] = useState<number>(0);

  // Toplam tutarı parent'da yakala ve orderCart'a gonder
  const handleTotalAmountChange = (totalAmount: number) => {
    setTotalAmount(totalAmount);
  };

  return (
    <div className="shoppingContainer">
      <div className="content">
        <ShoppingCart onTotalAmountChange={handleTotalAmountChange} /> {/* Toplam tutarı parent'a gönderecek fonksiyonu prop olarak geçiyoruz */}
      </div>
      <div className="orderContent">
        <OrderCart totalAmount={totalAmount} /> {/* OrderCart'a toplam tutarı prop olarak veriyoruz */}
      </div>
    </div>
  );
};

export default Shoping;
