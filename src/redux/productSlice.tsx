import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from './store';

// Ürün tipi
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  showcase_image: string;
  quantity: number; // Ürün miktarı
}

// State tipi
interface ProductState {
  products: Product[];
}

// Başlangıç durumu
const initialState: ProductState = {
  products: [],
};

// Slice oluşturuluyor
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Ürün ekleme
    addProduct: (state, action: PayloadAction<Omit<Product, 'quantity'>>) => {
      const existingProduct = state.products.find(product => product.id === action.payload.id);
      if (existingProduct) {
        // Eğer ürün zaten varsa, quantity artır
        existingProduct.quantity += 1;
      } else {
        // Eğer yoksa, yeni bir ürün olarak ekle ve quantity = 1
        state.products.push({ ...action.payload, quantity: 1 });
      }
    },

    // Ürün silme (quantity azaltma veya kaldırma)
    removeProduct: (state, action: PayloadAction<number>) => {
      const existingProduct = state.products.find(product => product.id === action.payload);
      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          // Miktarı azalt
          existingProduct.quantity -= 1;
        } else {
          // Eğer miktar 1 ise ürünü tamamen kaldır
          state.products = state.products.filter(product => product.id !== action.payload);
        }
      }
    },

    // Ürün sayısını artırma
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const existingProduct = state.products.find(product => product.id === action.payload);
      if (existingProduct) {
        existingProduct.quantity += 1;
      }
    },

    // Ürün sayısını azaltma
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const existingProduct = state.products.find(product => product.id === action.payload);
      if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
      }
    },

    // Tüm ürünleri temizleme
    clearProducts: (state) => {
      state.products = []; // Ürünler listesini boşalt
    }
  },
});

// Actionlar
export const { addProduct, removeProduct, incrementQuantity, decrementQuantity,clearProducts } = productSlice.actions;

// Ürün sayısını artırmak için async dispatch fonksiyonu
export const removeProductAsync = (productId: number) => (dispatch: AppDispatch) => {
  dispatch(removeProduct(productId)); // Redux'a ürün silme action'ını gönder
};

export const incrementQuantityAsync = (productId: number) => (dispatch: AppDispatch) => {
  dispatch(incrementQuantity(productId)); // Redux'a ürün sayısını artırma action'ını gönder
};

// Ürün sayısını azaltmak için async dispatch fonksiyonu
export const decrementQuantityAsync = (productId: number) => (dispatch: AppDispatch) => {
  dispatch(decrementQuantity(productId)); // Redux'a ürün sayısını azaltma action'ını gönder
};

// Reducer
export default productSlice.reducer;
