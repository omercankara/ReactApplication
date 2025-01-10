import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  name: string;
  price: number;
  showcase_image: string;
  quantity: number;
}

interface Order {
  id: number;
  name: string;
  price: number;
  showcase_image: string;
  quantity: number;
  createdAt: string; // Sipariş tarihi
}

interface OrderState {
  orders: Order[]; // Siparişler burada tutulacak
  totalAmount: number; // Toplam tutar
}

const initialState: OrderState = {
  orders: [], // Bu state `store.ts`'de `localStorage`'dan yüklenecek
  totalAmount: 0, // `localStorage`'dan alınacak totalAmount
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // Sipariş ekleme
    addOrder: (state, action: PayloadAction<{ products: Product[]; totalAmount: number }>) => {
      // Yeni siparişleri oluşturuyoruz
      action.payload.products.forEach((product) => {
        // Aynı ürün zaten siparişler arasında varsa, onu ekleme
        const existingOrder = state.orders.find(order => order.id === product.id);

        if (!existingOrder) {
          // Yeni sipariş oluşturuluyor
          const newOrder: Order = {
            id: Date.now() + product.id, // Sipariş için benzersiz bir ID
            name: product.name, // Ürün adı
            price: product.price, // Ürün fiyatı
            showcase_image: product.showcase_image, // Ürün Gorseli
            quantity: product.quantity, // Ürün miktarı
            createdAt: formatDateToTurkish(new Date()), // Siparişin oluşturulma tarihi (Türkçe format)
          };

          state.orders.push(newOrder); // Yeni sipariş ekleniyor
        }
      });

      // Toplam tutarı güncelle
      state.totalAmount = action.payload.totalAmount;
    },

    // Siparişleri temizleme
    clearOrders: (state) => {
      state.orders = []; // Sipariş listesini sıfırla
      state.totalAmount = 0; // Toplam tutarı sıfırla
    },


  },
});

// Türkçe tarih formatı (gün ay yıl)
const formatDateToTurkish = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };

  // `toLocaleDateString` ile Türkçe formattına döndürme işlemi
  return date.toLocaleDateString('tr-TR', options);
};

export const { addOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
