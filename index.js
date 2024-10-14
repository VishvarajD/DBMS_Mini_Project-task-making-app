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
app.post('/create',(req,res)=>{
  fs.writeFile(`files/${req.body.title.split(' ').join('')}.txt`,req.body.content,(err)=>{ 
  })
  res.redirect('/')
})
const t = [];
const c =[];
app.get('/readMore',(req,res)=>{
  const title1 = req.body.title;
  const content1 = req.body.content;
  c.push(content1);
  t.push( title1);
   
  res.render('readmore.ejs',{c:c,t:t})
})

app.listen(`${port}`);


