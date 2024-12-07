import { useState, useEffect } from "react";
import {
  FiMapPin,
  FiSearch,
  FiUser,
  FiHeart,
  FiShoppingBag,
} from "react-icons/fi";
import "./Header.css";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { IoIosClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";


const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cityList, setCityList] = useState([
    "Toshkent",
    "Andijon",
    "Samarqand",
    "Buxoro",
    "Farg'ona",
    "Namangan",
    "Navoiy",
    "Urganch",
    "Qarshi",
  ]);
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState(""); // State for the selected city

  const { auth, setAuth } = useAuth();

  const handleLogout = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
  };

  // Save selected city to localStorage and update state
  const handleCitySelect = (city, e) => {
    e.preventDefault();
    setSelectedCity(city);
    localStorage.setItem("selectedCity", city); // Save to localStorage
    setIsModalOpen(false);
  };

  // Load the selected city from localStorage on component mount
  useEffect(() => {
    const savedCity = localStorage.getItem("selectedCity");
    if (savedCity) {
      setSelectedCity(savedCity); // Update state with saved city
    }
  }, []); // Empty dependency array ensures this runs only on mount

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 32);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredCities = cityList.filter((city) =>
    city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="top-bar">
        <div className="top-bar-content">
          <div className="location" onClick={() => setIsModalOpen(true)}>
            <FiMapPin />
            <span>{selectedCity || "Shaharni tanlang"}</span> {/* Show selected city */}
          </div>
          <nav className="top-nav">
            <a href="#">Topshirish punktlari</a>
            <a href="#" className="purple">
              Sotuvchi bo'lish
            </a>
            <a href="#" className="purple">
              Topshirish punktini ochish
            </a>
            <a href="#">Savol-javob</a>
            <a href="#">Buyurtmalarim</a>
          </nav>
          <div className="language">
            <span>O'zbekcha</span>
          </div>
        </div>
      </div>

      <header className={`main-header ${isScrolled ? "scrolled" : ""}`}>
        <div className="header-content">
          <a href="/" className="logo">
            <img
              src="https://avatars.mds.yandex.net/i?id=94a13b379efed56c0a9fabd19486845939c177ef26697e50-11951579-images-thumbs&n=13"
              alt="Uzum Market"
            />
          </a>

          <button className="catalog-btn">
            <span className="catalog-icon">≡</span>
            Katalog
          </button>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Mahsulotlar va turkumlar izlash"
              aria-label="Search products"
            />
            <button className="search-btn" aria-label="Search">
              <FiSearch />
            </button>
          </div>

          <div className="header-actions">
            {auth?.user ? (
              <>
                <Menu className="w-28 flex">
                  <MenuHandler>
                    <Button className=" bg-white text-black border-0">
                      <FiUser className="text-3xl font-normal" />
                    </Button>
                  </MenuHandler>
                  <MenuList>
                    <MenuItem className=" text-black">
                      <Link
                        to={`/dashboard/${auth.user.role === 1 ? "admin" : "user"}`}
                      >
                        Dashboard
                      </Link>
                    </MenuItem>
                    <MenuItem className="text-black">
                      <Link onClick={handleLogout} to={"/login"}>
                        Log out
                      </Link>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </>
            ) : (
              <>
                <a href="#" className="header-action" aria-label="Login">
                  <FiUser />
                  <span>Kirish</span>
                </a>
              </>
            )}

            <a href="user_favourite" className="header-action" aria-label="Favorites">
              <FiHeart />
              <span >Saralangan</span>
            </a>
            <a href="#" className="header-action" aria-label="Cart">
              <FiShoppingBag />
              <span>Savat</span>
            </a>
          </div>
        </div>
      </header>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Shaharni tanlang</h2>
              <button
                className="close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                <IoIosClose />
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                placeholder="Shaharni qidirish"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
              <ul className="city-list">
                {filteredCities.map((city, index) => (
                  <li
                    key={index}
                    className="city-item"
                    onClick={(e) => handleCitySelect(city, e)}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
