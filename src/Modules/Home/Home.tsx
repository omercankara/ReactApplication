import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ProductCard from "./Components/AppProduct";
import productApi from "../../Services/productApi";
import { addProduct } from '../../redux/productSlice';
import { AppDispatch } from '../../redux/store';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import './Assets/Home.css';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  showcase_image: string;
}

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  //Orjinal veri setim
  const [products, setProducts] = useState<Product[]>([]);
  
  //sıralama
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  
  //filtreleme 
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productApi.getProduct();
        setProducts(response);
        setSortedProducts(response);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Ürünleri sıralama
  const handleSort = (order: 'asc' | 'desc') => {
    setSortOrder(order);
    const sorted = [...products].sort((a, b) =>
      order === 'asc' ? a.price - b.price : b.price - a.price
    );
    setSortedProducts(sorted);
  };

  // Ürünleri filtreleme
  const handleSearch = (query: string) => {
    setSearchQuery(query);

    //orjinal veri setim içinde filtreleme yap ve filtrelenen ürünleri setSortedProducts ile güncelle
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setSortedProducts(filtered);
  };

  const handleProductClick = (product: Product) => {
    console.log(product);
    dispatch(addProduct(product));
    toast.success('Added to cart');
  };

  return (
    <div className='product-container'>
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

      {/* Sıralama ve Filtreleme Alanı */}
      <div className="controls">
        <input
          type="text"
          placeholder="Filter products..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <select onChange={(e) => handleSort(e.target.value as 'asc' | 'desc')}>
          <option value="asc">Price: İncrement</option>
          <option value="desc">Price: Decrement</option>
        </select>
      </div>


      {/* Ürün Kartları */}
      {sortedProducts.length > 0 ? (
        sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            showcase_image={product.showcase_image}
            onClick={() => handleProductClick(product)}
          />
        ))
      ) : (
        <p>No Results</p>
      )}
    </div>
  );
};

export default Home;
