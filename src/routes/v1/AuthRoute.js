import express from 'express'
import { AuthValidation } from '../../validations/AuthValidation.js'
import { AuthController } from '../../controllers/AuthController.js'
const Router = express.Router()

Router.route('/register')
      .post(AuthValidation.ValidateRegister, AuthController.register)

Router.route('/login')
      .post(AuthValidation.ValidateLogin, AuthController.login)

Router.route('/google-login')
      .post(AuthValidation.ValidateLoginWithGoogle, AuthController.loginWithGoogle)
Router.route('/refresh-token')
      .get(AuthController.refreshToken)
export const AuthRoute = Router
