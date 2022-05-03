const express = require("express");

const router = express.Router();


const commentsApi = require("../../../controllers/api/v2/comments_api.js");

router.get("/", commentsApi.index);


module.exports = router;