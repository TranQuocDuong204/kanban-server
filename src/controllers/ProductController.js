import { StatusCodes } from "http-status-codes"
import { CategoriesModel } from "../models/CategoriesModel.js";


const getCategories = async (req, res) => {
    const {page, pageSize} = req.query;
    
    try {

        const category = await CategoriesModel.getAll()

        return res.status(StatusCodes.OK).json({
            message: "Get categories", category
        })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error })
    }
}

const addCategory = async (req, res) => {
    const { slug, parentsId } = req.body;


    try {
        const reqData = {
            ...req.body,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        const category = await CategoriesModel.find({
            parentsId,
            slug
        })
        if (category.length > 0) {
            res.status(StatusCodes.CREATED).json({ message: "Has existed, Please add a new categories" })
        } else {
            const data = await CategoriesModel.save(reqData)
            const getData = await CategoriesModel.findOneById(data.insertedId)
            console.log(getData);
            res.status(StatusCodes.OK).json({ message: "Add categories sucessfully", data: getData })
        }


    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error })
    }
}
export const ProductController = {
    getCategories,
    addCategory
}