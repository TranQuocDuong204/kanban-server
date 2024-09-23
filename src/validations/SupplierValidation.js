import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
const createdNew = async (req, res, next) => {
    const createNew = Joi.object({
        name: Joi.string().required().min(3),
        email: Joi.string().required().min(3).max(50).email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'vn'] } }),
        slug: Joi.string(),
        product: Joi.string().min(3).max(50),
        categories: Joi.array().items(Joi.string()),
        price: Joi.number(),
        isTasking: Joi.number(),
        contact: Joi.number(),
        photoUrl: Joi.string(),
        active: Joi.number(),
        isDeleted: Joi.boolean().default(false),
        createdAt: Joi.string().default(new Date()),
        updatedAt: Joi.string().default(new Date())
    })

    try {

        await createNew.validateAsync(req.body, { abortEarly: false })

        next()
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({ message: error })
    }
}




export const SupplierValidation = {
    createdNew,

}
