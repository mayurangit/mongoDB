const { Double } = require('bson');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/peopleDB', {useNewUrlParser: true, useUnifiedTopology: true});
console.log("Database Connected");


//schema for course collection
const courseSchema= new mongoose.Schema({
    name : String,
    fee : Number
})

const Course = mongoose.model("Course", courseSchema);

const course1=new Course({
    name : "PHP",
    fee : 10000
})

course1.save();


//schema for person collection
const personShema= new mongoose.Schema({
    name : {
        type : String,
        required : [true, "The name is must to enter"]
    },
    age:{
        type : Number,
        min : 20,
        max : 50
    },
    favcourse : courseSchema

})

const Person=mongoose.model("Person", personShema);

const person1= new Person({
name : "Mayu",
age : 38,
favcourse : "PHP"
});

const person2 = new Person({
    name : "Abi",
    age : 31
})

const person3 = new Person({
    name : "Rajeethan",
    age : 32
})


// Coding for Insert 

  Person.insertMany([person1,person2,person3], function(err){
    if(err)
    {
        console.log("Error in save : " + err);
    }
    else
    {
        console.log("Successfully saved");
    }
 }) 


//coding for Find All
Person.find(function(err, persons){
    if(err)
    { console.log(err);
    }
    else{
        
        console.log("Following persons found....")
        persons.forEach(function(person){
            console.log(person.name);
            
        })
    }
    mongoose.connection.close();
})

//Update the document(record)

Person.updateOne({_id : "609cb34c5464a94b74833a47" }, {name : "Abu"}, function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Successfully Updated");
    }
})

//Delete a document
Person.deleteOne({_id : "609cb34c5464a94b74833a47"}, function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Successfully Deleted");
    }
})


