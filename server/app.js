const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const models = require('./models')
const bcrypt = require('bcrypt')
const saltRounds = 10
const PORT = 8080

app.use(cors())
app.use(bodyParser.json())

function authenticate(req,res, next) {

  let headers = req.headers["authorization"]
  let token = headers.split(' ')[1]

  jwt.verify(token,'secret',(err, decoded) => {
    if(decoded) {
      if(decoded.username) {
        next()
      } else {
        res.status(401).json({message: 'Token invalid'})
      }
    } else {
      res.status(401).json({message: 'Token invalid'})
    }
  })

}

app.post('/register', (req,res) => {
    bcrypt.hash(req.body.password, saltRounds, function(err,hash) {

    let username = req.body.username
    let password = hash

    let newUser = models.User.build({
        username: username,
        password: password
    })
    models.User.findOne({
        where: {username : req.body.username}
      }).then(function (result) {
            if (null != result) {
              console.log("USERNAME ALREADY EXISTS:", result.username);
            }
            else {
              newUser.save().then(function(newUser){
             })
    
        }
      })
    })
})
// route for post a username and password

app.post('/login', (req, res) => {
    let username = req.body.username
    let password = req.body.password

    models.User.findOne({
        where: {
            username: username
            // password: password
        }
    })
    .then((user) => {
        if(user) {
            jwt.sign({ username: username}, 'secret', function(err, token) {
                if (token) {
                    res.json({token: token, id: user.dataValues.id})
                } else {
                    res.status(500).json({message: 'unable to generate token'})
                }
            })
        }
    })
})

app.post('/api/cheeselist',(req,res) => {

  let photo = req.body.photo
  let name = req.body.name
  let type = req.body.type
  let milk = req.body.milk
  let origin = req.body.origin
  let texture = req.body.texture
  let notes = req.body.notes
  let rating = req.body.rating
  let user = req.body.user

  let Entry = models.Journal.build({
    photo: photo,
    name: name,
    type: type,
    milk: milk,
    origin: origin,
    texture: texture,
    notes: notes,
    rating: rating,
    user: user
  })

  Entry.save().then((savedEntry) => {
    if(savedEntry) {
      res.json({success: true})
    } else {
      res.json({success: false, message: 'Error saving entry'})
    }
  })

})

app.get('/api/cheeselist', async (req,res) => {

  let list = await models.Journal.findAll()
  res.json(list)
})

app.post('/delete', (req, res) => {
  models.Journal.destroy({
      where: {
          id: req.body.entryKey
      }
  })
})

app.listen(PORT,() => {
  console.log('Server is running...')
})
