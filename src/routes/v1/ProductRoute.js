import express from 'express'
import { verifyToken } from '../../middlewares/verifyToken.js'
import { ProductController } from '../../controllers/ProductController.js'

const Router = express.Router()

Router.route('/products')
      .get(verifyToken, ProductController.getProducts)

export const ProductRoute = Router
