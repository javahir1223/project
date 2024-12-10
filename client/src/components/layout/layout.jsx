/* eslint-disable react/prop-types */
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, title }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <link rel="canonical" href=" http://mysite.com/example " />
      </Helmet>
      <Header />
      <main>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};
export default Layout;
