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
import AdminDashboard from './pages/admin/AdminDashboard'
import Login from './pages/auth/Login'
import Dashboard from './pages/user/dashboard'

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/dashboard' element={<PrivateRoute />}>
					<Route path='user' element={<Dashboard />} />
				</Route>
				<Route path='/admin-dashboard' element={<AdminRoute />}>
					<Route path='admin' element={<AdminDashboard />} />
				</Route>
				<Route path='/about' element={<About />} />
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
				<Route path='/contact' element={<Contact />} />
				<Route path='/policy' element={<Policy />} />
				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</>
	)
}

export default App
