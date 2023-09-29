const express=require("express")
const body=require("body-parser");
const mongoose = require("mongoose");
const app=express()
app.use(body.urlencoded({extended:true}))
app.use(express.static("public"))


mongoose.connect("mongodb+srv://Akarsha:akarsha123@cluster0.qsnopmz.mongodb.net/logindb",{useNewUrlParser:true})

const userschema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const usermodel=mongoose.model("userdata",userschema)

app.get("/index",function(req,res){

    usermodel.find().then((name,password) => {
        res.render('index', {name:name,password:password})

    }).catch((err) =>{

        console.log(err)
    });    
})


app.get("/FrontLogin",function(req,res){

        res.render('FrontLogin')

    });


app.post("/",function(req,res){
    var name=req.body.uname
    var password=req.psw
    name.save()
    password.save()
    const data=new usermodel({name:name,password:password})
    res.redirect("/")
})

app.listen(process.env.PORT ||3000,function(){
    console.log("Server is started")
})
