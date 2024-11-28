
import 'react-toastify/dist/ReactToastify.css'
import Header from './header'
import {Helmet} from "react-helmet";

const Layout = ({children, title, keywords ="shop, online"}) => {
	return (
		<div>
			<Helmet>
                <meta charSet="utf-8" />
				<meta name="keywords" content={keywords} />
                <title>{title}</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
			<Header/>
			<main>
				{children}
			</main>
			{/* <Footer/> */}
		</div>
	)
}

export default Layout
