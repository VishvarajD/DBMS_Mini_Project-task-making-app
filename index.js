// const exp = require('constants');
const express = require('express');
const fs = require('fs');
const path = require('path')
const bodyParser = require('body-parser')
const app = express();
const port = 3001;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public' )));
app.set('view engine','ejs');

app.get('/',(req,res)=>{
  fs.readdir(`files`,(err,files)=>{
      
  res.render('index.ejs',{files:files})
    
  })
});

app.get('/file/:filename',(req,res)=>{

  
   
  res.render('readmore.ejs')
})

app.get('/readMore/:filename',(req,res)=>{
  fs.readFile(`files/${req.params.filename}`,'utf-8',function(err,filedata){
    res.render('readmore',{filename: req.params.filename,filedata:filedata});
  })

})

app.post('/create',(req,res)=>{
  fs.writeFile(`files/${req.body.title.split(' ').join('')}.txt`,req.body.content,(err)=>{ 
  })
  res.redirect('/')
})



app.listen(`${port}`);


