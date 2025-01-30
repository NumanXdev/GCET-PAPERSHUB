const express = require("express");
const router = express.Router();
const userVerification = require("../Middlewares/AuthMiddleware");

router.get("/testing", userVerification, async (req, res) => {
  res.send("Success");
});

module.exports = router;
