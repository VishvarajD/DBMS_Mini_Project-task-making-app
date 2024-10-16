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
  const tutSchema = new mongoose.Schema({
    taskName:{
      type:String,
      required:true
    },
    taskContent:{
      type:String,
      required:true
    }
   
  });
  const collection =mongoose.models.tasks || new mongoose.model('tasks',tutSchema);





app.get('/',async (req,res)=>{
  const tasks = await collection.find({}); 
  res.render('index.ejs',{tasks}); 
  });


app.post('/create',async (req,res)=>{
 
  const {title ,content} = req.body;
   

  const newTask = new collection({ taskName: title, taskContent:content });
  await newTask.save();
  res.redirect('/')
 
});


app.get('/edit/:filename',async (req,res)=>{

  const task = await collection.findById(req.params.filename);
  res.render('edit.ejs', { task });
})

app.post('/edit/:filename',async (req,res)=>{

    try{
      const {title ,content } = req.body;
    await collection.findByIdAndUpdate(req.params.filename,{taskName:title,taskContent:content
    });
    res.redirect('/');
  }catch(err){
    console.log(err);
    res.redirect('/')
    
  }

})
app.post('/delete/:filename',async (req,res)=>{
  await collection.findByIdAndDelete(req.params.filename);
    res.redirect('/');
})





app.listen(`${port}`);


