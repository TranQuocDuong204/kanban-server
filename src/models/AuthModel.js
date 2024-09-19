import { ObjectId } from "mongodb"
import { GET_DB } from "../configs/mongodb.js"
const SIGN_UP_COLLECTION_NAME = 'users'

const findOne = async (email) => {
  try {
    const result = await GET_DB().collection(SIGN_UP_COLLECTION_NAME).findOne({ email: email })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const save = async (user) => {
  try {
    const result = await GET_DB().collection(SIGN_UP_COLLECTION_NAME).insertOne(user)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    const result = await GET_DB().collection(SIGN_UP_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const AuthModel = {
  findOne,
  save,
  findOneById
}