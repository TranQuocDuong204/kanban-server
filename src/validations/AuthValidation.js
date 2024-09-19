import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
const ValidateRegister = async (req, res, next) => {
    const Register = Joi.object({
        name: Joi.string().required().min(3).max(50),
        email: Joi.string().required().min(3).max(50).email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'vn'] } }),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        createdAt: Joi.string().default(new Date()),
        updatedAt: Joi.string().default(new Date())
    })

    try {

        await Register.validateAsync(req.body, { abortEarly: false })

        next()
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({ message: error })
    }
}


const ValidateLogin = async (req, res, next) => {
    const Login = Joi.object({
        email: Joi.string().required().min(3).max(50).email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'vn'] } }),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    })

    try {

        await Login.validateAsync(req.body, { abortEarly: false })

        next()
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({ message: error })
    }
}

const ValidateLoginWithGoogle = async (req, res, next) => {
    const Login = Joi.object({
        name: Joi.string().required().min(3).max(50).trim(),
        email: Joi.string().required().min(3).max(50).email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'vn'] } }),
    })

    try {

        await Login.validateAsync(req.body, { abortEarly: false })

        next()
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({ message: error })
    }
}


export const AuthValidation = {
    ValidateRegister,
    ValidateLogin,
    ValidateLoginWithGoogle
}
