import React, { useEffect, useState } from 'react';
import ApiService from '../services/apiService';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('Products component: Fetching products...');
    const getProducts = async () => {
      try {
        const data = await ApiService.fetchProducts();
        setProducts(data);
        console.log('Products component: Products fetched successfully.');
      } catch (err) {
        setError(err.message);
        console.error('Products component: Error fetching products:', err);
      }
    };

    getProducts();
  }, []);

  return (
    <div>
      <h2>Products Page</h2>
      {error && <p>{error}</p>}
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
