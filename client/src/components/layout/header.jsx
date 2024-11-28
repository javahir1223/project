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
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { auth, setAuth } = useAuth();

  const handleLogout = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
  };
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 32);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="top-bar">
        <div className="top-bar-content">
          <div className="location">
            <FiMapPin />
            <span>Toshkent</span>
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
                {/* dropdown */}
                <Menu className="w-28 flex">
                  <MenuHandler>
                    <Button className="h-[100px] bg-white text-black border-0">
                      Menu
                    </Button>
                  </MenuHandler>
                  <MenuList>
                    <MenuItem className="w-28  text-black">
                      Menu Item 1
                    </MenuItem>
                    <MenuItem className=" text-black"><Link to={`/dashboard/${auth.user.role === 1 ? "admin" : "user"}`}>Dashboard</Link></MenuItem>
                    <MenuItem
                      className="text-black"
                    >
                      <Link onClick={handleLogout} to={'/login'}>Log out</Link>
                    </MenuItem>
                  </MenuList>
                </Menu>
                {/* /dropdown */}
              </>
            ) : (
              <>
                <a href="#" className="header-action" aria-label="Login">
                  <FiUser />
                  <span >Kirish</span>
                </a>
              </>
            )}

            <a href="#" className="header-action" aria-label="Favorites">
              <FiHeart />
              <span>Saralangan</span>
            </a>
            <a href="#" className="header-action" aria-label="Cart">
              <FiShoppingBag />
              <span>Savat</span>
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
