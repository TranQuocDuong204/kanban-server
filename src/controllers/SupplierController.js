import { StatusCodes } from "http-status-codes"
import { SupplierModel } from "../models/SupplierModel.js";

const getSupplier = async (req, res) => {
    const { page, pageSize } = req.query

    try {
        const skip = (page - 1) * pageSize;
        const result = await SupplierModel.getAll(skip, parseInt(pageSize));
        const total = await SupplierModel.totalPage()
        
        return res.status(StatusCodes.OK).json({ message: "Get all data from supplier", result, total })
    } catch (error) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Error when get data", error })

    }
}


const createdNew = async (req, res) => {
    const { name, email, product, categories, price, photoUrl,
        isTasking, slug, contact, active } = req.body
    try {
        const createSupplier = {
            name,
            email,
            product,
            categories,
            price,
            photoUrl,
            isTasking,
            contact,
            active,
            slug,
            isDeleted: false,
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

const update = async (req, res) => {
    const { name, email, product, categories, price, photoUrl, isTasking, slug, contact, active } = req.body;
    const { id } = req.query;

    if (!id) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Missing supplier ID" });
    }

    try {
        const updateData = {
            name,
            email,
            product,
            categories,
            price,
            photoUrl,
            isTasking,
            contact,
            active,
            slug,
            updatedAt: Date.now()
        };

        const resultUp = await SupplierModel.update(id, updateData);
        console.log(resultUp);

        return res.status(StatusCodes.OK).json({
            message: "Supplier updated",
            data: [],
        });

    } catch (error) {
        console.error("Error in updating supplier:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "An error occurred" });
    }
};

const removeSupplier = async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Missing supplier ID" });
    }

    try {
        const resultRemove = await SupplierModel.deleteSupplier(id);

        return res.status(StatusCodes.OK).json({
            message: "Supplier removed",
            data: [],
        });

    } catch (error) {
        console.error("Error in updating supplier:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "An error occurred" });
    }
};

const removeSupplierSoft = async (req, res) => {
    const { isDeleted } = req.body

    const { id } = req.query;
    if (!id) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Missing supplier ID" });
    }

    try {
        const resultRemoveSoft = await SupplierModel.removeSupplierSoft(id, isDeleted);

        return res.status(StatusCodes.OK).json({
            message: "Supplier removed soft",
            data: [],
        });

    } catch (error) {
        console.error("Error in updating supplier:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "An error occurred" });
    }
};

export const SupplierController = {
    createdNew,
    getSupplier,
    update,
    removeSupplier,
    removeSupplierSoft
}