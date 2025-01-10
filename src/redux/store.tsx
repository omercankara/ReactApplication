import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './orderSlice';
import productReducer from './productSlice';

// localStorage'dan Orders'ı ve TotalAmount'u al
const loadOrdersFromLocalStorage = () => {
  const orders = localStorage.getItem('orders');
  return orders ? JSON.parse(orders) : [];
};

const loadTotalAmountFromLocalStorage = () => {
  const totalAmount = localStorage.getItem('totalAmount');
  return totalAmount ? JSON.parse(totalAmount) : 0;
};

const initialOrderState = {
  orders: loadOrdersFromLocalStorage(), // localStorage'dan alınan orders
  totalAmount: loadTotalAmountFromLocalStorage(), // localStorage'dan alınan totalAmount
};

const store = configureStore({
  reducer: {
    orders: orderReducer,
    products: productReducer, // Diğer slice'larınızı da burada ekleyebilirsiniz
  },
  preloadedState: {
    orders: initialOrderState, // orders ve totalAmount'u buradan alıyoruz
  },
});

// Store'daki değişiklikleri `localStorage`'a kaydetmek
store.subscribe(() => {
  const state = store.getState();
  const orders = state.orders.orders; // Orders verisini al
  const totalAmount = state.orders.totalAmount; // TotalAmount verisini al

  localStorage.setItem('orders', JSON.stringify(orders)); // Orders'ı localStorage'a kaydet
  localStorage.setItem('totalAmount', JSON.stringify(totalAmount)); // TotalAmount'u localStorage'a kaydet
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
