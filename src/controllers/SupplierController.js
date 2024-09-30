import { StatusCodes } from "http-status-codes"
import { SupplierModel } from "../models/SupplierModel.js";
import { formItem } from "../contants/form.js";
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
    try {
        const createSupplier = {
            ...req.body,
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
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error
        })

    }
}

const update = async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Missing supplier ID" });
    }

    try {
        const updateData = {
            ...req.body,
            updatedAt: Date.now()
        };

        const resultUp = await SupplierModel.update(id, updateData);

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
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "An error occurred", error });
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
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "An error occurred", error });
    }
};

const getForm = async (req, res) => {
    try {
        const form = {
            title: "Supplier",
            layout: "horizontal",
            labelCol: 6,
            wrapperCol: 18,
            size: "middle",
            formItem: formItem
        }

        return res.status(StatusCodes.OK).json({
            message: "",
            form
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

const getExportData = async (req, res) => {
    const body = req.body
    const { start, end } = req.query
    console.log(start, end, "date");

    const filter = {}

    if (start && end) {
        const startDate = new Date(start.replace(" ", "T"))
        const endDate = new Date(end.replace(" ", "T"))

        filter.createdAt = {

            $gte: startDate.getTime(),
            $lte: endDate.getTime()
        };
    }

    try {
        const items = await SupplierModel.find(filter)
        const data = [];
        if (items.length > 0) {
            items.forEach((item) => {
                const value = {};

                body.forEach((key) => {
                    value[`${key}`] = `${item[`${key}`] ?? ''}`;
                });

                data.push(value);
            });
        }
        return res.status(StatusCodes.OK).json({ message: "Export data excel", data })


    } catch (error) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Error when get data", error })

    }
}

export const SupplierController = {
    createdNew,
    getSupplier,
    update,
    removeSupplier,
    removeSupplierSoft,
    getForm,
    getExportData
}