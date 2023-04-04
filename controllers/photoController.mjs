import Photo from "../models/photoModel.mjs";
const createPhoto = async (req,res) => {
    const photo = await Photo.create(req.body) 
    res.status(201).json({
        succeded:"true",
        photo
    })
}
export {createPhoto}