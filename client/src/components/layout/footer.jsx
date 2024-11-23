import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <div>
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>О нас</h3>
              <ul>
                <li>
                  <a href="/about">Вакансии</a>
                </li>
                <li>
                  <a href="/careers"> Пункты выдачи </a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Пользователям</h3>
              <ul>
                <li>
                  <a href="/how-to-buy"> Связаться с нами </a>
                </li>
                <li>
                  <a href="/payment"> Вопрос - Ответ </a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Для предпринимателей</h3>
              <ul>
                <li>
                  <a href="/sell"> Продавайте на Uzum </a>
                </li>
                <li>
                  <a href="/seller-center"> Вход для продавцов </a>
                </li>
                <li>
                  <a href="/seller-policy"> Открыть пункт выдачи </a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Скачать приложение</h3>
              <p>
                Email: support@uzum.com
                <br />
                Phone: +998 71 234 56 78
                <br />
                Address: Tashkent, Uzbekistan
              </p>
              <div className="social-links">
                <a href="https://facebook.com/uzum">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="https://instagram.com/uzum">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://telegram.me/uzum">
                  <i className="fab fa-telegram"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>«2024© ООО «UZUM MARKET». ИНН 309376127. Все права защищены»</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
