import { StatusCodes } from "http-status-codes"
import { SupplierModel } from "../models/SupplierModel.js";

const getSupplier = async (req, res) => {

    try {
        const result = await SupplierModel.getAll();
        return res.status(StatusCodes.OK).json({ message: "Get all data from supplier", result })
    } catch (error) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Error when get data", error })

    }
}


const createdNew = async (req, res) => {
    const { name, product, categories, price, photoUrl,
        isTasking, slug, contact } = req.body
    try {
        const createSupplier = {
            name,
            product,
            categories,
            price,
            photoUrl,
            isTasking,
            contact,
            slug,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        const supplierNew = await SupplierModel.save(createSupplier)
        const id = supplierNew.insertedId

        const getOneSupplier = await SupplierModel.findOneById(id)
        return res.status(StatusCodes.OK).json({
            message: "Created new Supplier", data: {
                getOneSupplier
            }
        })

    } catch (error) {
        console.log(error);

    }
}

export const SupplierController = {
    createdNew,
    getSupplier
}