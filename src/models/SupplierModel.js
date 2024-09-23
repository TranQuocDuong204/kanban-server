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

const getAll = async (skip, pageSize) => {
    try {
        const cursor = await GET_DB().collection(SUPPLIER_COLLECTION_NAME).find({ isDeleted: false })
        .skip(skip)
        .limit(pageSize)
        const result = await cursor.toArray();
        return result;
    } catch (error) {
        throw new Error(error)
    }
}

const totalPage = async () => {
    try {
        const cursor = await GET_DB().collection(SUPPLIER_COLLECTION_NAME).countDocuments()
     
        return cursor;
    } catch (error) {
        throw new Error(error)
    }
}




const update = async (id, data) => {
    try {
        const result = await GET_DB()
            .collection(SUPPLIER_COLLECTION_NAME)
            .findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: data }, 
            );

        return result; 
    } catch (error) {
        console.error("Error updating supplier:", error);
        throw error; 
    }
};

const deleteSupplier = async (id) => {
    try {
        const result = await GET_DB()
            .collection(SUPPLIER_COLLECTION_NAME)
            .findOneAndDelete(
                { _id: new ObjectId(id) },
            );

        return result;
    } catch (error) {
        console.error("Error updating supplier:", error);
        throw error; 
    }
}


const removeSupplierSoft = async (id, data) => {
    try {
        const result = await GET_DB()
            .collection(SUPPLIER_COLLECTION_NAME)
            .findOneAndUpdate(
                { _id: new ObjectId(id) }, 
                { $set: { "isDeleted": data } }, 
            );

        return result; 
    } catch (error) {
        console.error("Error updating supplier:", error);
        throw error;
    }
};



export const SupplierModel = {

    save,
    findOneById,
    getAll,
    update,
    deleteSupplier,
    removeSupplierSoft,
    totalPage
}