const express = require("express")
const { htmlTopdf } = require("./htmlToPdf")

const router = express.Router()



router.route("/convert").post(htmlTopdf)


module.exports = router