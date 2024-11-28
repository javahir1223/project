import { Route, Routes } from 'react-router-dom'
import './App.css'
import About from './pages/About'
import Contact from './pages/Contact'
import HomePage from './pages/HomePage'
import PageNotFound from './pages/PageNotFound'
import Policy from './pages/Policy'
import Register from './pages/auth/Register'

import 'react-toastify/dist/ReactToastify.css'
import AdminRoute from './components/routes/AdminRoute'
import PrivateRoute from './components/routes/privateRoute'
import Login from './pages/auth/Login'
import Dashboard from './pages/user/dashboard'
import AllProducts from './pages/admin/AllProducts'
import ManageUsers from './pages/admin/ManageUsers'
import CreateProducts from './pages/admin/CreateProducts'
import AdminDashboard from './pages/admin/AdminDashboard'
import CreateCategory from './pages/admin/CreateCategory'
function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/dashboard" element={<PrivateRoute />}>
					<Route path="user" element={<Dashboard />} />
				</Route>
				
				<Route path="/dashboard" element={<AdminRoute />}>
					<Route path='admin' element={<AdminDashboard />} /> 
					<Route path="admin/create" element={<CreateProducts />} />
					<Route path="admin/products" element={<AllProducts />} />
					<Route path="admin/category" element={<CreateCategory />} />
					<Route path="admin/users" element={<ManageUsers />} />
				</Route>
				
				<Route path="/about" element={<About />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/policy" element={<Policy />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</>
	)
}

export default App
