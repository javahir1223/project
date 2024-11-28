import React from 'react'
import Layout from '../../components/layout/layout'
import { AdminMenu } from '../../components/layout/AdminMenu'

const AdminDashboard = () => {
	return (
		<Layout>
			<div className="flex">
				<div className="">
					<AdminMenu />
				</div>
				<div className="flex justify-center z-10" >
					AdminDashboard
				</div>

			</div>
		</Layout>

	)
}
export default AdminDashboard