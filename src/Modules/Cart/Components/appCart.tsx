import React from 'react';
import '../Assets/appCart.css';
import { removeProductAsync, incrementQuantityAsync, decrementQuantityAsync } from '../../../redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../redux/store';

interface AppCartProps {
  onTotalAmountChange: (totalAmount: number) => void; // Parent'a toplam tutarı gönderecek fonksiyon
}

const AppCart: React.FC<AppCartProps> = ({ onTotalAmountChange }) => {
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch<AppDispatch>();

  // Toplam fiyatı hesapla
  const calculateTotal = () => {
    return products.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  // Ürünü tamamen kaldır
  const handleRemoveProduct = (id: number) => {
    dispatch(removeProductAsync(id));
  };

  // Ürün sayısını artır
  const handleIncrementQuantity = (id: number) => {
    dispatch(incrementQuantityAsync(id));
  };

  // Ürün sayısını azalt
  const handleDecrementQuantity = (id: number) => {
    dispatch(decrementQuantityAsync(id));
  };

  // Toplam tutarı parent'a gönder
  React.useEffect(() => {
    const totalAmount = calculateTotal();
    onTotalAmountChange(totalAmount);
  }, [products, onTotalAmountChange]); // 'products' değiştiğinde toplam tutarı parent'a gönder

  return (
    <div className="cart-container">
      <h2>My Cart</h2>
      {products.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        products.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="img-container">
              <img src={item.showcase_image} alt={item.name} />
            </div>

            <div className="item-details">
              <div className="quantity">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>${(item.price * item.quantity).toFixed(2)}</p> {/* Fiyat * Miktar */}
                <div className='quantity-controls'>
                  <button onClick={() => handleDecrementQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrementQuantity(item.id)}>+</button>
                </div>
                <button className="remove-btn" onClick={() => handleRemoveProduct(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))
      )}
      {products.length > 0 && (
        <div className="total">
          <h3>Total: ${calculateTotal().toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default AppCart;
