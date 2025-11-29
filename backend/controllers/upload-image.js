async function uploadImage(req,res){
    try {
        if(!req.file){
            return res.status(400).json({msg : "You did not uploaded any file"})
        }
        return res.json({
            success : true,
            url : req.file.path //! CLoudinary URL from multer.
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = uploadImage;