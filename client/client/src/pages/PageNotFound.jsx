import { Link } from 'react-router-dom'
import Layout from '../components/layout/layout'


const PageNotFound = () => {
	return (
		<Layout >
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					textAlign: 'center',
				}}
			>
				<h1 className='pnf-title'>404</h1>
				<h2 className='pnf-heading'>Oops ! Page Not Found</h2>
				<Link to='/' className='pnf-btn'>
					Go Back
				</Link>
			</div>
		</Layout>
	)
}

export default PageNotFound
