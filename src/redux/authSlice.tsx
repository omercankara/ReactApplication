import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from './store';

// State tipi
interface AuthState {
  token: string | null;
}

// Başlangıç durumu
const initialState: AuthState = {
  token: null, // İlk başta token boş olacak
};

// Slice oluşturuluyor
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = null;
    },
  },
});

// Actionlar
export const { setToken, removeToken } = authSlice.actions;

// Token'ı Redux'a kaydetme (localStorage'a kaydediyoruz)
export const persistToken = (token: string) => (dispatch: AppDispatch) => {
  try {
    localStorage.setItem('token', token); // Token'ı localStorage'a kaydediyoruz
    dispatch(setToken(token)); // Redux store'a token'ı kaydediyoruz
  } catch (error) {
    console.error('Token localStorage\'a kaydedilemedi:', error);
  }
};

// Token'ı temizleme (localStorage'tan silme)
export const clearToken = () => (dispatch: AppDispatch) => {
  try {
    localStorage.removeItem('token'); // Token'ı localStorage'tan siliyoruz
    dispatch(removeToken()); // Redux store'dan token'ı siliyoruz
  } catch (error) {
    console.error('Token localStorage\'tan silinemedi:', error);
  }
};

// Token'ı localStorage'tan yükleme
export const loadToken = () => (dispatch: AppDispatch) => {
  try {
    const token = localStorage.getItem('token'); // localStorage'tan token'ı alıyoruz
    if (token) {
      dispatch(setToken(token)); // Eğer token varsa, Redux store'a yüklüyoruz
    }
  } catch (error) {
    console.error('Token localStorage\'tan yüklenemedi:', error);
  }
};

// Reducer
export default authSlice.reducer;
