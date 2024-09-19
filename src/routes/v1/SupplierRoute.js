import express from 'express'
import { verifyToken } from '../../middlewares/verifyToken.js'
import { SupplierController } from '../../controllers/SupplierController.js'
import { SupplierValidation } from '../../validations/SupplierValidation.js'
const Router = express.Router()

Router.route('/')
    .get(SupplierController.getSupplier)
Router.route('/create-new')
    .post(SupplierValidation.createdNew, SupplierController.createdNew)
export const SupplierRoute = Router