import { Route, Routes } from 'react-router-dom'
import './App.css'
import About from './pages/About'
import Contact from './pages/Contact'
import HomePage from './pages/HomePage'
import PageNotFound from './pages/PageNotFound'
import Policy from './pages/Policy'

import 'react-toastify/dist/ReactToastify.css'
import AdminRoute from './components/routes/AdminRoute'
import PrivateRoute from './components/routes/privateRoute'
import AdminDashboard from './pages/admin/AdminDashboard'
import Dashboard from './pages/user/dashboard'
import RegisterPage from './pages/auth/pages/RegisterPage'
import LoginPage from './pages/auth/pages/LoginPage'
import Header from './components/layout/header'
import FavoritesAndCart from './pages/user/FavouritesAndCart'
import Electronics from './pages/Electronics'

function App() {
	return (
		<>
			<Header/>
			<Routes>
				<Route path='/dashboard' element={<PrivateRoute />}>
					<Route path='user' element={<Dashboard />} />
					<Route path='user_favourite' element={<FavoritesAndCart />} />

				</Route>
				<Route path='/admin-dashboard' element={<AdminRoute />}>
					<Route path='admin' element={<AdminDashboard />} />
				</Route>
				<Route path='/about' element={<About />} />
				<Route path='/' element={<HomePage />} />
				<Route path='/electronics' element={<Electronics />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage/>}/>
				<Route path='/contact' element={<Contact />} />
				<Route path='/policy' element={<Policy />} />
				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</>
	)
}

export default App
