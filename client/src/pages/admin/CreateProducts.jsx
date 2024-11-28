import React from 'react'
import Layout from '../../components/layout/layout'
import { AdminMenu } from '../../components/layout/AdminMenu'

const Createproducts = () => {
    return (
        <Layout>
            <div className="flex">
                <div className="">
                    <AdminMenu />
                </div>
                <div className="">
                    Createproducts
                </div>
            </div>
        </Layout>
    )
}

export default Createproducts