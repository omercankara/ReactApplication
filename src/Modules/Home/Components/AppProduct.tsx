// components/ProductCard.tsx
import React from 'react';
import '../Assets/productCard.css';

interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  showcase_image: string;
  onClick: () => void; // onClick fonksiyonu prop olarak al ve parent componente gönder
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, description, showcase_image,onClick }) => {
  return (
    <div className="card" >
      <img src={showcase_image} alt={name} className="image" />
      <div className="details">
        <h2 className="title">{name}</h2>
        <p className="description">{description}</p>
        <p className="price">${price}</p>
        <button onClick={onClick} className="addToCartButton">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
