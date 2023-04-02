const multer = require('multer');
const path = require("path")
// set storage
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads', true.toString())
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
        // image.jpg
        // var ext = file.originalname.substr(file.originalname.lastIndexOf('.'));

        // cb(null, file.fieldname + '-' + Date.now() + ext)
        // if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        //     return cb(new Error('Only image files are allowed!'));
        // }
        // cb(null, true);
    }
    // , limits: { fileSize: 1024 * 1024 * 2 }
})

module.exports = store = multer({ storage: storage })


// const multer = require('multer');
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// });
// const upload = multer({
//     storage: storage,
//     fileFilter: function (req, file, cb) {
//         if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//             return cb(new Error('Only image files are allowed!'));
//         }
//         cb(null, true);
//     },
//     limits: { fileSize: 1024 * 1024 * 2 }
// });
