const express = require('express');
const multer = require('multer');
const app = express();

const storage = multer.memoryStorage();

var upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype !== 'application/pdf') {
            return cb(null, false, new Error('I don\'t have a clue!'));
        }
        cb(null, true);
    }

}).array(MyCv[120]);

module.exports = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.send(err);
            res.status(500).json({ message: 'Something went wrong' });
            
        } else {
           res.status(200).json({ message: 'You got an email :-)'});
            
            const newFile = {
                applicantEmail: req.body.email,
                cvUrl: req.file.buffer,
                motivationLetterUrl: req.file.buffer
            }
        }
    });
}
