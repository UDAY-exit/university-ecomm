import UniversityModel from "../models/University.js";
export const createUnitversity  = async (req, res) => {
    try {
        const univData = await UniversityModel.create({
            name: req.body.name,
            image: req?.file?.filename,
        });
        if (univData)
            res
                .status(200)
                .send({ message: "University created successfully", data: univData });
        else res.status(400).json({ message: "University creation failed" });
    } catch (error) {
        res.status(500).json({ message: "Error creating university", error: error.message });
    }
};

export const updateUniversity = async (req, res) => {
    try {
        const updateData = {
            name: req.body.name
        };

        if (req.file) {
            updateData.image = req.file.filename;
        }

        const univData = await UniversityModel.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (univData) {
            res.status(200).send({
                message: "University Updated successfully",
                data: univData
            });
        } else {
            res.status(404).send({
                message: "University not found"
            });
        }

    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};


export const deleteUniversity = async(req,res)=>{
    try{
        const univData = await UniversityModel.deleteOne({
            _id:req.body.id,
        });
        if(univData.deletedCount > 0)
        res.status(200).send({message:"University deleted succesfully"});
    else res.status(404).send({message:"University not found"});
    }catch(error){
res.status(500).send({message:error.message});
    }
};


export const getUniversities = async (req,res)=>{
    try{
        const univData = await UniversityModel.find();
        res.status(200).send({univData});
    }catch(error){
res.status(500).send({message:error.message});
    }
    
};