import { ObjectId } from "mongodb"
import { GET_DB } from "../configs/mongodb.js"
const SUPPLIER_COLLECTION_NAME = 'supplier'

const save = async (supplier) => {
    try {
        const result = await GET_DB().collection(SUPPLIER_COLLECTION_NAME).insertOne(supplier)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const findOneById = async (id) => {
    try {
        const result = await GET_DB().collection(SUPPLIER_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const getAll = async () => {
    try {
        const cursor = await GET_DB().collection(SUPPLIER_COLLECTION_NAME).find()
        const result = await cursor.toArray();
        return result;
    } catch (error) {
        throw new Error(error)
    }
}



export const SupplierModel = {

    save,
    findOneById,
    getAll

}