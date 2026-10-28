// imports
const express = require("express") //importing express package
const app = express() // creates a express application
const dotenv = require("dotenv").config() //this allows me to use my .env values in this file
const mongoose = require("mongoose")
const methodOverride = require('method-override')
const morgan = require('morgan')
const Cat = require('./models/Cats')


// Middleware
app.use(express.static('public')); //all static files are in the public folder
app.use(express.urlencoded({ extended: false })); // this will allow us to see the data being sent in the POST or PUT
app.use(methodOverride('_methods'))
app.use(morgan('dev'))


async function conntectToDB(){ //connection to the database
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to Database")
    }
    catch(error){
        console.log("Error Occured",error)
    }
}


conntectToDB()

// Routes go here

app.get('/',(req,res)=>{
    res.render('./homepage.ejs')
})

//CRUD

//create
app.get('/cats/new',(req,res)=>{
  res.render('create-cat.ejs')
})

app.post('/cats',async(req,res)=>{
  req.body.isFriendly = req.body.isFriendly === 'on' 
  const createdCat = await Cat.create({
    name: req.body.name,
    age: Number( req.body.age),
    breed: req.body.breed,
    isFriendly: req.body.isFriendly,
    furColor: req.body.furColor,
    catImage: req.body.catImage
  })
  res.redirect('/cats') 
})

//read
app.get('/cats', async (req,res)=>{

    const allCats = await Cat.find()
    res.render('cat-list.ejs',{cats:allCats})
})

app.get('/cats/:catId',async(req,res)=>{
    const foundCat = await Cat.findById(req.params.catId)
    // console.log(foundCat)
    res.render('cat-details.ejs',{cats : foundCat})
})


//delete

app.delete('/cats/:catId/delete', async(req,res)=>{
    await Cat.findByIdAndDelete(req.params.catId)
    res.redirect('/cats')
})

//update
 app.get('/cats/:catId/edit',async (req,res)=>{
    const foundCat = await Cat.findById(req.params.catId)
    res.render('edit-cat.ejs',{cats: foundCat})
 })

 app.put('/cats/:catId',async(req,res)=>{
    req.body.isFriendly = req.body.isFriendly === 'on'
    const updatedCat = await Cat.findByIdAndUpdate(req.params.catId,req.body)

    res.redirect('/cats')
 })


app.listen(3000,()=>{
    console.log("Listening on port " + 3000)
}) // Listen on port 3000
