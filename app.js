const express=require('express');
const authRoutes=require('./routes/auth-routers');
const profileRoutes=require('./routes/profile-routes');
const app=express();
const passportSetup=require('./config/passport-setup');
const mongoose=require('mongoose');
const keys=require('./config/keys');
const cookieSession=require('cookie-session');
const passport=require('passport');

app.set('view engine','ejs');

app.use(cookieSession({
	maxAge:24*60*60*1000,
	keys:[keys.session.cookieKey]
}));

//initialize passport

app.use(passport.initialize());
app.use(passport.session());

//connect to mongo db

mongoose.connect(keys.mongodb.dbURL,{useNewUrlParser:true},()=>{
console.log('connected to mongo db');
});

//set up routes
app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);

app.get('/',(req,res)=>{
	res.render('home');
})

app.listen(3000,()=>{
	console.log('Listening on port 3000');
});