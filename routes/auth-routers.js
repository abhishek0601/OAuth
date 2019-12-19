const router = require('express').Router();
const passport=require('passport');


//auth login
router.get('/login',(req,res)=>{
	res.render('login');
});

//auth log out

router.get('/logout',(req,res)=>{
	//handle with passport
	req.logout();
	res.redirect('/');
});

//auth with google

router.get('/google',passport.authenticate('google',{
	scope:['profile']
}));
//callback call to google redirect

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
	res.redirect('/profile/');
});

//auth with facebook
router.get('/facebook',passport.authenticate('facebook',{
	scope:['email']
}));

router.get('/facebook/redirect',passport.authenticate('facebook'),(req,res)=>{
	res.redirect('/profile/');
});

module.exports=router;