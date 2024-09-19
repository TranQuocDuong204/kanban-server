import jwt from 'jsonwebtoken'
import { env } from '../configs/evironment.js'
export const getAccessToken = async ({_id, email, rule}) => {
    const token = jwt.sign({_id, email, rule}, env.SECRET_KEY,{ expiresIn: '1h' })
    return token
}