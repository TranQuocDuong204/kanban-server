import { ObjectId } from "mongodb"
import { GET_DB } from "../configs/mongodb.js"
const CATEGORIES_COLLECTION_NAME = 'categories'

const save = async (categories) => {
    try {
        const result = await GET_DB().collection(CATEGORIES_COLLECTION_NAME).insertOne(categories)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const findOneById = async (id) => {
    try {
        const result = await GET_DB().collection(CATEGORIES_COLLECTION_NAME).findOne({ _id: id })
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const getAll = async () => {
    try {
        const cursor = await GET_DB().collection(CATEGORIES_COLLECTION_NAME).find({
        })
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

const find = async (filter) => {

    try {
        const cursor = await GET_DB().collection(CATEGORIES_COLLECTION_NAME).find(filter)
        const result = await cursor.toArray();
        return result;
    } catch (error) {
        throw new Error(error)
    }
}



export const CategoriesModel = {

    save,
    findOneById,
    getAll,
    update,
    deleteSupplier,
    removeSupplierSoft,
    totalPage,
    find
}