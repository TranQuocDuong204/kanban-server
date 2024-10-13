import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
const createdNew = async (req, res, next) => {
    const createNew = Joi.object({
        title: Joi.string().required().min(3),
        parentsId: Joi.string().empty(["", null]),
        slug: Joi.string(),
        description: Joi.string(),
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




export const CategoriesValidation = {
    createdNew,

}
