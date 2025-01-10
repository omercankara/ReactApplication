import axios from "axios";
import apiUrl from "./api";


const getProduct = async () => {
    try {
        const response = await axios.get(apiUrl + "/products");
        return response.data; 
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error; // Hata durumunda yeniden fırlatıyoruz
    }
};

export default {
    getProduct,
};
