import { useEffect, useState } from 'react';
// import { MdKeyboardArrowRight } from "react-icons/md";
import instance from '../axios';
import Layout from '../components/layout/layout';

const HomePage = () => {

  const [data, setData] = useState([]); // State to store fetched products
  const [loading, setLoading] = useState(true); // State for loading indicator

  useEffect(() => {
    console.log('useEffect triggered');
    instance
      .get('/product/get-product')
      .then((response) => {
        console.log('API Response:', response.data); // Log full response
        if (response.data && Array.isArray(response.data.products)) {
          console.log('Products array:', response.data.products); // Log products
          setData(response.data.products); // Set products to state
        } else {
          console.warn('No products found in API response.');
          setData([]); // Set empty array if no products found
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setData([]); // Fallback to empty array on error
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  if (!Array.isArray(data) || data.length === 0) {
    console.log('No products available:', data);
    return <h1>No products available</h1>;
  }

  console.log('Rendering products:', data); // Log before rendering

  return (
    <Layout>
    <div className="container">
      <h1 className="text-4xl text-center font-bold py-24 flex items-center justify-center">
        Mashhur<span className="ml-2">  {`>`}</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {data.map((product, index) => (
          <div
            className="w-[300px] mb-5 rounded-md p-3 mx-10 hover:shadow-gray-600 hover:shadow-md cursor-pointer"
            key={product._id || index}
          >
            <div>
              <img
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-4"
                onError={(e) => (e.target.src = '/placeholder.jpg')}
              />
              <h3 className="font-medium text-gray-800 text-lg mb-2">{product.name || 'Unnamed Product'}</h3>
              <p className="text-gray-600 text-sm mb-4">{product.description || 'No description available'}</p>
              <p className="text-green-500 font-bold text-lg mb-2">
                {product.price ? `$${product.price}` : 'Price not available'}
              </p>
              <p className="text-gray-500 text-sm mb-4">Category: {product.category?.name || 'N/A'}</p>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded w-full">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </Layout>
  );
};

export default HomePage;
