const UploadModel = require('../model/schema');
const fs = require('fs');
//const File = require('../model/File');
exports.home = async (req, res) => {
    res.render('upload/upload-files');
}


exports.uploads = (req, res, next) => {
    const files = req.files;

    if (!files) {
        const error = new Error('Please choose files');
        error.httpStatusCode = 400;
        return next(error)
    }

    // convert images into base64 encoding
    let imgArray = files.map((file) => {
        let img = fs.readFileSync(file.path)

        return encode_image = img.toString('base64')
    })

    let result = imgArray.map((src, index) => {

        // create object to store data in the collection
        let finalImg = {
            filename: files[index].originalname,
            contentType: files[index].mimetype,
            imageBase64: src,
            user: req.user._id,
            user_name: req.user.name,


        }

        let newUpload = new UploadModel(finalImg);

        return newUpload
            .save()
            .then(() => {
                return { msg: `${files[index].originalname} Uploaded Successfully...!` }

            })
            .catch(error => {
                if (error) {
                    if (error.name === 'MongoError' && error.code === 11000) {
                        return Promise.reject({ error: `Duplicate ${files[index].originalname}. File Already exists! ` });
                    }
                    return Promise.reject({ error: error.message || `Cannot Upload ${files[index].originalname} Something Missing!` })
                }
            })
    });

    Promise.all(result)
        .then(msg => {
            // res.json(msg);
            res.redirect('/')
        })
        .catch(err => {
            res.json(err);
        })
}

//

// exports.uploads_mp3 = (req, res, next) => {
//     const mp3Files = req.files;

//     if (!mp3Files || mp3Files.length === 0) {
//         res.render('upload', { error: 'Por favor, selecciona al menos un archivo .mp3' });
//     } else {
//         try {
//             // Guardar la información de cada archivo en MongoDB
//             const savedFiles = [];
//             for (const mp3File of mp3Files) {
//                 const file = new File({
//                     filename: mp3File.filename,
//                     originalname: mp3File.originalname,
//                     mimetype: mp3File.mimetype,
//                     size: mp3File.size
//                 });
//                 const savedFile = file.save(); //await
//                 savedFiles.push(savedFile);
//             }

//             // Renderizar la vista para mostrar los archivos subidos
//             res.render('uploaded', { mp3Files: savedFiles });
//         } catch (error) {
//             res.render('upload', { error: 'Error al guardar los archivos en MongoDB' });
//         }
//     }
// }