import express from 'express'
import formidable from 'express-formidable'
import { createProductController, deleteProductController, getProductController, getSingleProductController, productFilterController, updateProductController } from '../controllers/productController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'



const router = express.Router()

// routes 
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

// get products
router.get('/get-product', getProductController)

// single product
router.get('/get-product/:slug', getSingleProductController)

// update product
router.put(
	"/update-product/:pid",
	requireSignIn,
	isAdmin,
	formidable(),
	updateProductController
)

// delete product
router.delete('/product/:pid', deleteProductController)

// filter product
router.get('/product-filters', productFilterController)


export default router