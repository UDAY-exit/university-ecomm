import mongose from "mongose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import { createUnitversity } from "./controller/University";
import { createDepartment, deleteDepartment, getDepartmentByUniversity, updateDepartment } from "./controller/Department";
import { createProduct, deleteProduct, getProductDetails, getProductsByDepartment, updateProduct } from "./controller/Product";
import { login, register } from "./controller/User";

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

app.post("/university",uploadUniv.single("image"),createUnitversity);
app.put("/university",uploadUniv.single("image"),updateUnitversity );
app.delete("/university",deleteUnitversity);
app.get("/university",getUnitversity);


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

mongose.connect(process.env.DB_URL).then((response) => {
    console.log("DB connected successfully");
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})

    .catch((err) => {
        console.log("DB connection failed", err);
    });