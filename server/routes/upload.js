const express = require("express");
const router = express.Router();
const cloudinary = require("../config/cloudinary");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try{
  if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
// console.log("FILE:", req.file);
// console.log("ENV:", process.env.CLOUD_NAME);

 cloudinary.uploader.upload_stream(
    { folder: "blogs" },
    (error, result) => {
      if (error){
        console.log("Cloudinary Error:", error);
         return res.status(500).json({message:"Upload failed"});
      } 
      res.json({ url: result.secure_url });
    }
  ).end(req.file.buffer);
}catch (err){
  console.log("SERVER ERROR:", err);
  res.status(500).json({message: "Server Error"});
}

  
});

module.exports = router;