import { StatusCodes } from "http-status-codes"
import { AuthModel } from "../models/AuthModel.js"
import bcrypt from 'bcrypt'
import { getAccessToken } from "../utils/getAccessToken.js"
const register = async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) return res.status(StatusCodes.CONFLICT).json({ message: "Name, Email Or Password not found!!!" })
    try {
        const user = await AuthModel.findOne(email)
        if (user) {
            return res.status(StatusCodes.CONFLICT).json({ message: "Account already exists" })
        }
        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds)
        const hash = bcrypt.hashSync(password, salt)
        req.body.password = hash
        const userData = {
            name,
            email,
            password: hash,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        const newUser = await AuthModel.save(userData)
        const getNewUser = await AuthModel.findOneById(newUser.insertedId)
        delete getNewUser.password
        return res.status(StatusCodes.OK).json({
            message: "Signup successful", data: {
                ...getNewUser,
                token: await getAccessToken(
                    getNewUser._id,
                    getNewUser.email,
                    1
                )
            }
        })
    } catch (e) {
        console.log(e)
    }

}


const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Email or Password not found, Please enter!!" })
    try {
        const userLogin = await AuthModel.findOne(email)
        if (userLogin) {
            const { _id, email } = userLogin

            const comparePass = await bcrypt.compare(password, userLogin.password)
            delete userLogin.password
            if (comparePass) {
                return res.status(StatusCodes.OK).json({
                    message: "Login successfully", data: {
                        ...userLogin,
                        token: await getAccessToken(
                            _id,
                            email,
                            1
                        )
                    }
                })
            } else {
                return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Password incorrect, Please enter again!!" })
            }

        } else {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Login failed email or password not found" })
        }

    } catch (e) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "An error occurred, please try again later." });
    }

}

const loginWithGoogle = async (req, res) => {
    const { name, email } = req.body
    if (!name || !email) return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Name or Email not found, Please enter!!" })
    try {
        const user = await AuthModel.findOne(email)
        if (user) {
            const { _id, email } = user
            delete user.password
            return res.status(StatusCodes.OK).json({
                message: "Login successfully", data: {
                    ...user,
                    token: await getAccessToken(
                        _id,
                        email,
                        1
                    )
                }
            })
        }
        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds)
        const hash = bcrypt.hashSync('123456', salt)
        req.body.password = hash
        const userData = {
            name,
            email,
            password: hash,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        const newUser = await AuthModel.save(userData)
        const getNewUser = await AuthModel.findOneById(newUser.insertedId)
        delete getNewUser.password
        return res.status(StatusCodes.OK).json({
            message: "Login successful", data: {
                ...getNewUser,
                token: await getAccessToken(
                    getNewUser._id,
                    getNewUser.email,
                    1
                )
            }
        })
    } catch (e) {
        console.log(e)
    }

}

const refreshToken = async (req, res) => {
    const { id } = req.query

    try {
        const user = await AuthModel.findOneById(id);
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" })
        }

        const token = await getAccessToken(id, user.email, 1)
        delete user.password
        res.status(StatusCodes.OK).json({
            message: "Refresh token",
            data: {
                ...user,
                token
            }
        })
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({
            message: error.message
        })

    }
}

export const AuthController = {
    register,
    login,
    loginWithGoogle,
    refreshToken
}