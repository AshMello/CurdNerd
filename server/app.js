const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const models = require('./models')
const bcrypt = require('bcrypt')
const saltRounds = 10
const PORT = 8080




// const users = [
//   {username: 'johndoe', password: 'password'},
//   {username: 'marydoe', password: 'password'}
// ]

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

    models.User.findAll({
        where: {
            username: username,
            password: password
        }
    })
    .then((user) => {
        if(user) {

            jwt.sign({ username: username}, 'secret', function(err, token) {
                if (token) {
                    res.json({token: token})
                } else {
                    res.status(500).json({message: 'unable to generate token'})
                }
            })
        }
    })
})

app.listen(PORT,() => {
  console.log('Server is running...')
})
