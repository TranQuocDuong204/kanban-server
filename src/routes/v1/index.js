import express from 'express'
import { AuthRoute } from './AuthRoute.js'
import { ProductRoute } from './ProductRoute.js'
import { SupplierRoute } from './SupplierRoute.js'
const Router = express.Router()

Router.get('/', (req, res) => {
    res.send('Hello Server!')
})

Router.use('/auth', AuthRoute)
Router.use('/product', ProductRoute)
Router.use('/supplier', SupplierRoute)
export const APIS_v1 = Router