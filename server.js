const express = require('express');
const bcrypt =require('bcrypt-nodejs');
const cors =require('cors');
const knex =require('knex');
const signin =require('./controller/signin');
const register =require('./controller/register');
const profile =require('./controller/profile');
const image =require('./controller/image');

const db = knex({
  client: 'pg',
  connection: {
	  connectionString: process.env.DATABASE_URL,
	  ssl: {
	    rejectUnauthorized: false
	  }  
  }
});

// db.select('*').from('users').then(data =>{
// 	console.log(data);
// });
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req,res)=>{res.send('server up!!')})

app.post('/signin',(req, res) => {signin.handleSignin(req,res,db,bcrypt)})
app.post('/register',(req, res) =>{register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)})
app.put('/image',(req,res)=>{image.handleImage(req,res,db)})
app.post('/image/api',(req,res)=>{image.handleApi(req,res)})

app.listen(process.env.PORT || 3001, ()=>{
	console.log(`server running on ${process.env.PORT}`);	
})
