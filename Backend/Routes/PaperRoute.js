const router = require("express").Router();
const {
  Subjects,
  UploadPaper,
  ShowPaper,
} = require("../controllers/PaperController");
const { upload } = require("../Middlewares/Upload");
const userVerification = require("../Middlewares/AuthMiddleware");
const { isAdmin } = require("../Middlewares/isAdmin");

router.post("/upload", userVerification, isAdmin, upload, UploadPaper);
router.get("/subjects", Subjects);
router.get("/subjects/:id", userVerification, ShowPaper);

module.exports = router;
