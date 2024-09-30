import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
const createdNew = async (req, res, next) => {
    const createNew = Joi.object({
        title: Joi.string().required().min(3),
        slug: Joi.string(),
        categories: Joi.array().items(Joi.string()),
        quantity: Joi.number().default(0),
        price: Joi.number(),
        unit: Joi.string().default("Cái"),
        expiryDate: Joi.date(),
        createdAt: Joi.date().default(new Date()),
        updatedAt: Joi.date().default(new Date())
    })

    try {

        await createNew.validateAsync(req.body, { abortEarly: false })

        next()
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({ message: error })
    }
}




export const ProductValidation = {
    createdNew,

}
