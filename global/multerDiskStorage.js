const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

module.exports = (aimPath) =>
{
    return multer.diskStorage({
        destination: aimPath,
        filename: (req, file, cb) =>
        {
            crypto.pseudoRandomBytes(16, (err, raw) =>
            {
                cb(null, `${raw.toString('hex')}${Date.now()}${path.extname(file.originalname)}`);
            });
        }
    });
};