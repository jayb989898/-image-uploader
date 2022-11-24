const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const cors = require('cors');


app.use(cors());
app.use('/', express.static('images'));
app.listen(4200,() => {
    console.log("App is listening on port 4200")
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/')
    },
    filename: function (req, file, cb) {
        cb(null, 'image' + '-' + Date.now() + '-' + file.originalname)
    }
});

const uploadFilter = function(req, file, cb) {
    const ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return cb(new Error())
    }
    return cb(null, true)
}

const upload = multer({
    storage: storage,
    fileFilter: uploadFilter
    }).single('image');


app.post('/upload', function (req, res) {
    upload(req, res, function (err) {
        if(err) {
            res.status(400).send({
                success: 0,
                error: "Formato immagine non supportato"
            });
        } else {
            res.json({
                success: 1,
                image_url: 'http://localhost:4200/' + req.file.filename
            })
        }
    });
})
