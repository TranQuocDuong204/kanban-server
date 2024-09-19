import { StatusCodes } from "http-status-codes"


const getProducts = async (req, res) => {
   try {
    return res.status(StatusCodes.OK).json({message: "has accesss token", data: {
        product: []
    }})
   } catch (error) {
    console.log(error);
    
   }
}

export const ProductController = {
    getProducts
}