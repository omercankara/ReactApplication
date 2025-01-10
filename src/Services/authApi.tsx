import axios from "axios";
import apiUrl from "./api";


const Login = async (payload: any) => {
    try {
        const response = await axios.post(apiUrl + "/auth/login", payload); 
        return response.data;  
    } catch (err) {
        //console.error('APIçağrısında hata:', err);
    }
}

const createUser = async (payload: any) => {
    try {
        const response = await axios.post(apiUrl + "/auth/register", payload);  
        return response.data; 
    } catch (err) {
        //console.error('APIçağrısında hata:', err);
    }
}


const tokenVerify = async () => {
    try {
      const token = localStorage.getItem('token');  // localStorage'dan token'ı alıyoruz
  
      if (!token) {
        throw new Error("Token bulunamadı");  // Eğer token yoksa hata mesajı döndürüyoruz
      }
  
      // Axios ile GET isteği gönderirken Authorization header'a token ekliyoruz
      const response = await axios.get(apiUrl + "/users/me", {
        headers: {
          Authorization: `Bearer ${token}`  // Bearer token'ı header'a ekliyoruz
        }
      });
  
      return response.data;  // response.data ile gelen veriyi döndürüyoruz
    } catch (err) {
      console.error('API çağrısında hata:', err);  // Hata durumunda konsola yazdırıyoruz
    }
  }
  

export default {
    Login,
    createUser,
    tokenVerify
}