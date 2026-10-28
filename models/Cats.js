const mongoose = require("mongoose")


//Scheema 

const catScheema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
        min: 1,
        max: 20,
    },
    breed:{
      type: String,
      enum:['british shorthair','maine coon','ragdoll','persian','siamese','scottish fold','other'],
      lowerCase: true
    },
    isFriendly:{
        type: Boolean,  
    },
    furColor:{
        type: String,
        minLenght : 10,
        maxLenght : 20,
        
    },
    catImage:{
        type: String
    }
}, {timestamps : true})

//Model 

const Cat = mongoose.model('cat',catScheema)

//Export
module.exports = Cat