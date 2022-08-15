const express = require("express");
const multer = require("multer");
const router = express.Router();
const API = require("../controllers/api");

// Multer Middleware
let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});

let upload = multer({
  storage: storage
}).single("image");

router.get("/", API.fetchAllPostings);
router.get("/:id", API.fetchPostingByID);
router.post("/", upload, API.createPosting);
router.patch("/:id", upload, API.updatePosting);
router.delete("/:id", API.deletePosting);

module.exports = router;