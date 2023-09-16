const express = require('express');
const router = express.Router();

 
const { Setlogs, GetSql_records, Posttext_inSql } = require("../Controller/Controller")

// This Endpoint will be embedded in frontend 
router.route("/ngram").post(Setlogs) 
 

// Get from sql database
router.route("/get").get(GetSql_records)
// post text into sql database
router.route("/ptext").post(Posttext_inSql)

module.exports = router; 