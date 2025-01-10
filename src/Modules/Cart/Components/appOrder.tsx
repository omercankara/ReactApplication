import React from 'react';
import '../Assets/Shoping.css';
import { RootState, AppDispatch } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from '../../../redux/orderSlice';
import { clearProducts } from '../../../redux/productSlice';
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from 'react-toastify';

interface OrderCartProps {
  totalAmount: number; // Parent'tan gelen toplam tutar
}

const OrderCart: React.FC<OrderCartProps> = ({ totalAmount }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);

  // Sipariş ekleme
  const handleAddOrder = () => {
    // Toplam tutar ve ürünleri orderSlice'a göndermek

    if(products.length > 0){
      dispatch(addOrder({ products, totalAmount }));
      dispatch(clearProducts());
      navigate("/order");
    }else{
      toast.warning('There are no items in your cart');
    }
  };

  return (
    <div className="order-container">
      <ToastContainer
              position="top-right"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={true}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              transition={Bounce}
            />
      <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
      <button onClick={handleAddOrder}>Complete Shopping</button>
    </div>
  );
};

export default OrderCart;
