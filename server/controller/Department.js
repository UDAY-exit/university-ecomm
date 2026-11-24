import DepartmentModel from "../models/Department.js";

export const createDepartment = async (req,res)=>{
    try{
        const depData = await DepartmentModel.create({
            name:req?.file?.filename,
            university:req.body.universityId,
        });
        if(depData)
            res
        .status(200)
        .send({message:"Department Created !!!",data:depData});
        else res.status(404).send({message:"Unable to create departement"});
    }catch(error){
        console.log("fail to submit data");
    }
};

export const updateDepartment = async (req,res)=>{
    try{
        const depData = await DepartmentModel.findByIdAndUpdate(
            { _id:req.body.id},{

            name:req?.file?.filename,
            image:req?.file?.filename,
            university:req.body.universityId,
            
        });
        if(depData)
            res
        .status(200)
        .send({message:"Department Updated !!!",data:depData});
        else res.status(404).send({message:"Unable to update departement"});
    }catch(error){
        console.log("fail to submit data");
    }
};

export const deleteDepartment = async (req,res)=>{
    try{
        const depData = await DepartmentModel.deleteOne({_id:req.body.id});
        if(depData.deleteCount>0)
            res.status(200)
        .send({message:"Department Deleted !!!",data:depData});
        else res.status(404).send({message:"unable to delete department"});
    }catch(error){
        console.log("fail to submint data");
    }
};

export const getDepartmentByUniversity = async (req,res)=>{
    try{
        const depData = await DepartmentModel.find({university:req.query.universityId,}).populate("university");
    res.status(200).send({depData});
       
    }catch(error){
        console.log("fail to submint data");
    }
};