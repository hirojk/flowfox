const express = require("express");
const { testDatabaseConnection } = require("../controllers/testController");

const router = express.Router();

router.get("/test", testDatabaseConnection);

module.exports = router;
