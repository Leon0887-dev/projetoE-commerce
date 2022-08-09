const path = require('path');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        const folder = path.join(__dirname,'..','..','public','img');
        cb(null,folder);
    },
    filename: (req,file,cb)=>{
        // Usando o Date.now para gravar a data junto ao nome do arquivo
        const imageName = Date.now() + file.originalname;
        cb(null,imageName);
    },
});

const upload = multer({ storage });

module.exports = upload;