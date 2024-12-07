import React, { useEffect, useState } from 'react';
import instance from '../axios';

const Electronics = () => {
    const [minPrice, setMinPrice] = useState(3000);
    const [maxPrice, setMaxPrice] = useState(1299990);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);

    const categories = [
        "Elektronika", "Elektronika uchun aksessuarlar", "Kvadrokopterlar va aksessuarlar", 
        "Kompyuter texnikasi", "Quloqchinlar va audio texnikalar", 
        "Noutbuklar, planshetlar va elektron kitoblar", "Aqlli soatlar va fitnes bilaguzuklar", 
        "Foto va video texnika"
    ];

    const colors = [
        { name: "Jigarrang", color: "#8B4513" },
        { name: "Qizil", color: "#FF0000" },
        { name: "Yashil", color: "#008000" },
        { name: "Xaki", color: "#C3B091" },
        { name: "Binafsharang", color: "#800080" },
        { name: "Pushti", color: "#FFC0CB" },
    ];

    const brands = [
        "Oydin Electric", "Sunmi", "Weibo", "0-birds", "0story", "1000 Art-Hobby-Market"
    ];

    const handleMinRangeChange = (e) => {
        const newMinValue = parseInt(e.target.value);
        setMinPrice(newMinValue >= maxPrice ? maxPrice - 1000 : newMinValue);
    };

    const handleMaxRangeChange = (e) => {
        const newMaxValue = parseInt(e.target.value);
        setMaxPrice(newMaxValue <= minPrice ? minPrice + 1000 : newMaxValue);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category === selectedCategory ? null : category); // Toggle category
    };

    const handleColorChange = (color) => {
        setSelectedColors((prev) => {
            if (prev.includes(color)) {
                return prev.filter(c => c !== color);
            } else {
                return [...prev, color];
            }
        });
    };

    const handleBrandChange = (brand) => {
        setSelectedBrands((prev) => {
            if (prev.includes(brand)) {
                return prev.filter(b => b !== brand);
            } else {
                return [...prev, brand];
            }
        });
    };

    useEffect(() => {
        instance.get('/product/get-product')
            .then((response) => {
                setData(response.data?.products || []);
                setLoading(false);
            })
            .catch(() => {
                setData([]);
                setLoading(false);
            });
    }, []);

    const filteredData = data.filter((product) => {
        // Filter by price range
        if (product.price < minPrice || product.price > maxPrice) return false;

        // Filter by category
        if (selectedCategory && product.category?.name !== selectedCategory) return false;

        // Filter by color (assuming `color` is a field in the product object)
        if (selectedColors.length > 0 && !selectedColors.includes(product.color)) return false;

        // Filter by brand
        if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;

        return true;
    });

    if (loading) return <h1 className="text-center mt-10 text-lg font-medium">Loading...</h1>;
    if (!filteredData.length) return <h1 className="text-center mt-10 text-lg font-medium">No products available</h1>;

    return (
        <div className="flex flex-col lg:flex-row mt-8 px-4 mb-5">
            {/* Sidebar */}
            <div className="w-full lg:w-1/3 bg-gray-50 p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-800 mb-6">Filter Options</h2>

                {/* Categories */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
                    <ul className="list-none space-y-2">
                        {categories.map((category) => (
                            <li key={category}>
                                <a
                                    href="#"
                                    onClick={() => handleCategoryChange(category)}
                                    className={`block px-4 py-2 rounded-md font-medium text-gray-600 hover:bg-yellow-50 transition ${selectedCategory === category ? 'bg-yellow-100' : ''}`}
                                >
                                    {category}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Price Range */}
                <div className="mb-6 mt-5">
                    <h3 className="font-medium text-gray-700 mb-2">Narx, baho, so'm</h3>
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            className="w-1/2 border-gray-300 rounded-md text-sm p-2"
                            placeholder="dan"
                            value={minPrice}
                            onChange={(e) => setMinPrice(parseInt(e.target.value))}
                        />
                        <input
                            type="number"
                            className="w-1/2 border-gray-300 rounded-md text-sm p-2"
                            placeholder="oldin"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                        />
                    </div>
                    <div className="mt-4">
                        <input
                            type="range"
                            min="0"
                            max="1500000"
                            step="1000"
                            value={minPrice}
                            className="w-full text-purple-500"
                            onChange={handleMinRangeChange}
                        />
                        <input
                            type="range"
                            min="0"
                            max="1500000"
                            step="1000"
                            value={maxPrice}
                            className="w-full mt-2 text-purple-500"
                            onChange={handleMaxRangeChange}
                        />
                    </div>
                </div>

                {/* Colors */}
                <div className="mb-6">
                    <h3 className="font-medium text-gray-700 mb-2">Rang</h3>
                    <div className="space-y-2">
                        {colors.map(({ name, color }) => (
                            <label key={name} className="flex items-center gap-2 text-gray-600">
                                <input
                                    type="checkbox"
                                    className="form-checkbox text-yellow-500"
                                    onChange={() => handleColorChange(color)}
                                    checked={selectedColors.includes(color)}
                                />
                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                                {name}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Brands */}
                <div className="mb-6">
                    <h3 className="font-medium text-gray-700 mb-2">Brend</h3>
                    <div className="space-y-2">
                        {brands.map((brand) => (
                            <label key={brand} className="flex items-center gap-2 text-gray-600">
                                <input
                                    type="checkbox"
                                    className="form-checkbox text-yellow-500"
                                    onChange={() => handleBrandChange(brand)}
                                    checked={selectedBrands.includes(brand)}
                                />
                                {brand}
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="w-full lg:w-2/3 mt-6 lg:mt-0 lg:ml-6">
                <h2 className="text-2xl font-semibold mb-6">Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredData.map((product) => (
                        <div key={product._id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-4">
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
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Electronics;
