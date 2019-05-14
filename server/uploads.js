let express = require('express');
let ImageRouter = express.Router();
const multer = require('multer');
const cors = require('cors')

ImageRouter.use(cors())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/' );
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req,file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null,false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

ImageRouter.route("/cheesePost")
.post(upload.single('imageData'), (req,res,next) => {
    console.log(req.body);
    // let photo = req.body.photo
    // let name = req.body.name
    // let type = req.body.type
    // let milk = req.body.milk
    // let origin = req.body.origin
    // let texture = req.body.texture
    // let notes = req.body.notes
    // let rating = req.body.rating
    // let user = req.body.user
  
    // let Entry = models.Journal.build({
    //   photo: photo,
    //   name: name,
    //   type: type,
    //   milk: milk,
    //   origin: origin,
    //   texture: texture,
    //   notes: notes,
    //   rating: rating,
    //   user: user
    // })
  
    // Entry.save().then((savedEntry) => {
    //   if(savedEntry) {
    //     res.json({success: true})
    //   } else {
    //     res.json({success: false, message: 'Error saving entry'})
    //   }
    // })
})

// ImageRouter.post('/api/cheeselist',(req,res) => {


  
//   })

module.exports = ImageRouter
