var express = require("express");
var router = express.Router();

//under /testAPI/ prefix.
router.get("/", function(req, res, next) {
    res.send("API is working properly");
});

module.exports = router;