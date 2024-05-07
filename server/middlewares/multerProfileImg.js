const multer = require('multer');


const storage = multer.memoryStorage()


const uploads = multer({storage, fileFilter: (req, file, cb)=>{ 
        if(file.mimetype.startsWith('image')){
            
            cb(null, true);
        }else{
            
            cb('Ivalid file type', false)
            
        }
    
}})

module.exports = {uploads}
