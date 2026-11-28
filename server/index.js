import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import {
    createUnitversity,
    updateUniversity ,
    deleteUniversity ,
    getUniversities 
} from "./controller/University.js";
import { createDepartment, deleteDepartment, getDepartmentByUniversity, updateDepartment } from "./controller/Department.js";
import { createProduct, deleteProduct, getProductDetails, getProductsByDepartment, updateProduct, updateProductQty } from "./controller/Product.js";
import { login, register } from "./controller/User.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

//University Module
const storageUniv = multer.diskStorage({
    destination:"uploadsUniv/",
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}--${file.originalname}`);
    },
});
const uploadUniv = multer({
    storage:storageUniv,
});

app.post("/university", uploadUniv.single("image"), createUnitversity);
app.put("/university/:id", uploadUniv.single("image"), updateUniversity);
app.delete("/university", deleteUniversity);
app.get("/university", getUniversities);


//Department Module
const storageDep = multer.diskStorage({
    destination:"uploadsUniv/",
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}--${file.originalname}`);
    },
});
const uploadDep = multer({
    storage:storageDep,
});

app.post("/department",uploadDep.single("image"),createDepartment);
app.put("/department",uploadDep.single("image"),updateDepartment);
app.delete("/department",deleteDepartment);
app.get("/department",getDepartmentByUniversity);


//Product Module
const storagePrd = multer.diskStorage({
    destination:"uploadsPrd/",
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}--${file.originalname}`);
    },
});
const uploadPrd = multer({
    storage:storagePrd,
});

app.post("/product",uploadPrd.array("images"),createProduct);
app.put("/product",uploadPrd.array("images"),updateProduct);
app.delete("/product",deleteProduct);
app.get("/product",getProductsByDepartment);
app.get("/productDetail",getProductDetails);
app.put("/updateProductQty",updateProductQty);

//User Module
app.post("/register",register);
app.post("/login",login);


//Image Access

app.use(express.static("uploadsUniv/"));
app.use(express.static("uploadsDep/"));
app.use(express.static("uploadsPrd/"));


mongoose.connect(process.env.DB_URL).then((response) => {
    console.log("DB connected successfully");
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})

    .catch((err) => {
        console.log("DB connection failed", err);
    });