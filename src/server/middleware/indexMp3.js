const multer = require('multer');
const path = require("path")

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/music')//, true.toString()
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)

    }
});


module.exports = store = multer({storage: storage})