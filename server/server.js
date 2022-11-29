const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const authRoutes = require('./routes/auth-routes')
const profileRoutes = require('./routes/profile-routes')
const connectDB = require('./config/db')
const cors = require('cors')
const ejs = require('ejs')
const PORT = process.env.PORT || 8080
const session = require('express-session')
const cookieSession = require('cookie-session');
const bodyParser = require("body-parser")



// Mongodb Connection
connectDB()

const passport = require('passport')


const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(cookieSession({
    maxAge: 30 ,
    keys: ['key1', 'key2']
  }))

//Passport
app.use(passport.initialize())
app.use(passport.session())
  
app.use('/auth',authRoutes)
app.use('/profile',profileRoutes)

// app.use('/',(req,res)=>{
//     res.json({"name":"abc"})
// })

// app.use('*', (req, res)=>{
//     res.status(404).json({"error": "Not accessible"})
// })

app.listen(PORT,()=>{
    console.log(`Server Started at ${PORT}`)
})

