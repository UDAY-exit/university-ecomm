import { populate } from "dotenv";
import ProductModel from "../models/Product.js";

export const createProduct = async (req, res) => {
    try {
        let images = req?.files?.map((item) => {
            return item.filename;
        });
        const prdData = await ProductModel.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            qty: req.body.qty,
            images: images,
            department: req.body.departmentId,
        });
        if (prdData)
            res.status(200).send({ message: "Product Create SuccessFully !!!" });
        else res.status(404).send({ message: "Unable to create product !!!" });
    } catch (error) {
        console.log("Fail to submit data !!!");
    }
};


export const updateProduct = async (req, res) => {
    try {
        let images = req?.files?.map((item) => {
            return item.filename;
        });
        const prdData = await ProductModel.findByIdAndUpdate(
            { _id: req.body.id },
            {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                qty: req.body.qty,
                images: images,
                department: req.body.departmentId,
            });
        if (prdData)
            res.status(200).send({ message: "Product Updated SuccessFully !!!" });
        else res.status(404).send({ message: "Unable to Update product !!!" });
    } catch (error) {
        console.log("Fail to submit data !!!");
    }
};


export const deleteProduct = async (req, res) => {
    try {

        const prdData = await ProductModel.deleteOne({
            _id: req.body.id
        });
        if (prdData.deleteCount > 0)
            res.status(200).send({ message: "Product Deleted SuccessFully !!!" });
        else res.status(404).send({ message: "Unable to Delete product !!!" });
    } catch (error) {
        console.log("Fail to submit data !!!");
    }
};



export const getProductDetails = async (req, res) => {
    try {

        const prdData = await ProductModel.findOne({
            _id: req.body.productid
        }).populate({
            path: "department",
            populate: [{ path: "university" }],
        });
        res.status(200).send({ prdDetails });
    } catch (error) {
        console.log("Fail to submit data !!!");
    }
};



export const getProductsByDepartment = async (req, res) => {
    try {

        const prdData = await ProductModel.findOne({
            department: req.body.departmentId,
        }).populate({
            path: "department",
            populate: [{ path: "university" }],
        });
        res.status(200).send({ prdData });
    } catch (error) {
        console.log("Fail to submit data !!!");
    }
};



export const updateProductQty = async (req,res)=>{
    try{
        const productInDb = await ProductModel.findOne({_id:req.body.id});
        let active = true;
        if(productInDb.qty = req.body.qty <=0)active = false;
        const prdData = await ProductModel.findByIdAndUpdate(
            {_id:req.body.id},
            {
                active:active,
                qty:productInDb.qty = req.body.qty,
            },
        );
        if(prdData)res.status(200).send({message:"Product qty updated !!!"});
        else res.status(404).send({message:"Unable to update product qty !!!"});
    }catch(error){
        console.log("Fail to submit data");
    }
};