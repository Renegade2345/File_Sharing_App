const {Router} = require("express")
const {upload} = require("../service/FileStorage")
const {files} = require("../db")
const {io} = require("../service/Socket")

const router = new Router()

router.post("/upload", upload.single("file"),(req, res)=>{
    if(!req.file){
        return res.status(400).json({
            success:false, 
            message:"No file uploaded"
        })
    }
    const newFile = {
        fileName : req.file.originalname,
        path: req.file.path,
    }
    files.push(newFile)
    res.status(200).json({
        success:true,
        message:"File uploaded successfully"
    })
    io().emit("updateFileList", files)
})
router.get("/download/:filename", (req, res)=>{
    const filename = req.params.filename
    const filepath = `./uploads/${filename}`

    res.download(filepath, (err)=>{
        if(err){
            res.status(500).json({
                success:false,
                message:"Error downloading file"
            })
        }
    })
})


module.exports  = router