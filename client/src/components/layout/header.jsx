import { FaUserEdit } from "react-icons/fa"
import { GoSun } from "react-icons/go"
import { IoMdContact } from "react-icons/io"
import { PiTelegramLogoBold } from "react-icons/pi"

const Header = () => {
	return (
		<>
			<header className="flex justify-between p-4 items-center bg-gray-800 text-white shadow-md w-full">
				<h1 className="text-2xl font-semibold">Online Shop</h1>
				<ul className="flex gap-6">
					<li><PiTelegramLogoBold className="text-2xl hover:text-purple-400 transition" /></li>
					<li><GoSun className="text-2xl hover:text-yellow-400 transition" /></li>
					<li><FaUserEdit className="text-2xl hover:text-green-400 transition" /></li>
					<li><IoMdContact className="text-2xl hover:text-blue-400 transition" /></li>
				</ul>
			</header>
			<hr className="border-gray-700" />
		</>
	)
}

export default Header
