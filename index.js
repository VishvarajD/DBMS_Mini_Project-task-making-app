// const exp = require('constants');
const express = require('express');
const fs = require('fs');
const path = require('path')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const app = express();
const port = 3001;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public' )));
app.set('view engine','ejs');

//database connection
dotenv.config();
const connectDB = async () => {
  try {
      await mongoose.connect(process.env.mongo_url)
      console.log(`DB Connected`);
      
  } catch (error) {
      console.log(`Error while connecting db ${error}`);
    }
    
  }
  connectDB();




app.get('/',(req,res)=>{
  fs.readdir(`files`,(err,files)=>{
      
  res.render('index.ejs',{files:files})
    
  })
});

app.get('/readMore/:filename',(req,res)=>{
  fs.readFile(`files/${req.params.filename}`,'utf-8',function(err,filedata){
    res.render('readmore',{filename: req.params.filename,filedata:filedata});
  })
})

app.get('/edit/:filename',(req,res)=>{
  res.render('edit',{previous:req.params.filename,previousContent:req.body.content})
})

app.post('/edit',(req,res)=>{
  fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,(err)=>{
    console.log(req.body);
    
    res.redirect('/');
  })
})

app.post('/create',(req,res)=>{
  fs.writeFile(`files/${req.body.title.split(' ').join('')}.txt`,req.body.content,(err)=>{ 
  })
  const name = req.body.title;
  const desc = req.body.content;
  const tutSchema = new mongoose.Schema({
    taskName:{
      type:String,
      required:true
    },
    taskContent:{
      type:String,
      required:true
    }
   
  })
  //created a collection by 
  const collection =mongoose.models.tasks || new mongoose.model('tasks',tutSchema)
  
  data={
   taskName:name,
     taskContent:desc,
     
   }
  collection.insertMany([data])
  res.redirect('/')
})



app.listen(`${port}`);


