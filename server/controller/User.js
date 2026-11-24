import UserModel from "../models/User.js";

export const register = async (req, res) => {
    try {
        let userInDb = await UserModel.findOne({ email: req.body.email });
        if (userInDb) return res.status(404).send({ message: "User in use !!!" });
        const userData = await UserModel.create({
            ...req.body,
            profilePic: req?.file?.filename,
        });
    } catch (error) {
        console.log("Fail to submit data");
    }
};

export const login = async (req, res) => {
    try {
        let userInDb = await UserModel.findOne({ email: req.body.email, password: req.body.password, });
        if (userInDb) res.status(200).send({ id: userInDb._id, role: userInDb.role });
        else return res.status(404).send({ message: "Wrong user/pass!!!" });
    } catch (error) {
        console.log("Fail to submit data");
    }
};
