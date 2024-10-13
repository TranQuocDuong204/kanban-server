import express from 'express'
import { CategoriesValidation } from '../../validations/CategoriesValidation.js'
import { ProductController } from '../../controllers/ProductController.js'

const Router = express.Router()

Router.route('/get-categories')
      .get(ProductController.getCategories)
Router.route('/add-category')
      .post(CategoriesValidation.createdNew, ProductController.addCategory)

export const ProductRoute = Router
