const express = require("express");
const router = express.Router();
const controller = require("../controllers/image.controller");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), controller.createImage);
router.get("/:cityId", controller.getImagesByCity);
router.get("/", controller.getAll);
//router.delete("/images/:id", controller.deleteImage);
router.delete("/:id", controller.deleteImage);
router.put("/:id", controller.updateImage);

module.exports = router;