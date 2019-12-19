const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys=require('./keys');
const User=require('../models/user-model');
const FacebookStrategy=require('passport-facebook').Strategy;

passport.serializeUser((user,done)=>{
	done(null,user.id);
});


passport.deserializeUser((id,done)=>{
	
	User.findById(id).then((user)=>{
		done(null,user);
	});
});

passport.use(
	new GoogleStrategy({
	//options for strategy

	clientID:keys.google.clientID,
	clientSecret:keys.google.clientSecret,
	callbackURL:'/auth/google/redirect'
	},(accessToken,refreshToken,profile,done)=>{
	//passport callback function
	console.log(profile);
	
	User.findOne({'google.googleId':profile.id}).then((currentUser)=>{
		if(currentUser){
			console.log('user is :',currentUser);
			done(null,currentUser);
		}
		else{
			/*new User({
						google.username:profile.displayName,
						google.googleId:profile.id
						//thumbnail: profile._json.picture
					}).save().then((newUser)=>{
								console.log('new user created:'+newUser);
								done(null,newUser);
								});

				*/


					var us=new User();
					us.google.username=profile.displayName;
					us.google.googleId=profile.id;
					us.save().then((newUser)=>{
								console.log('new user created:'+newUser);
								done(null,newUser);
								});
			}
	});

	})

);
passport.use(
	new FacebookStrategy({
	//options for strategy

	clientID:keys.facebook.clientID,
	clientSecret:keys.facebook.clientSecret,
	callbackURL:'/auth/facebook/redirect'
	},(accessToken,refreshToken,profile,done)=>{
	//passport callback function

	console.log(profile);
	

	process.nextTick(function(){
		User.findOne({'facebook.facebookId':profile.id}).then((currentUser,err)=>{
		if(err) {
			console.log("Error");
		}
		if(currentUser){
			console.log('user is :',currentUser);
			done(null,currentUser);
		}
		else{

		/*	
			new User({

						facebook.username:profile.displayName,
						facebook.facebookId:profile.id
						//thumbnail: profile._json.picture
					}).save().then((newUser)=>{
								console.log('new user created:'+newUser);
								done(null,newUser);
								});

								*/
			
								var us=new User();
								us.facebook.username=profile.displayName;
								us.facebook.facebookId=profile.id;
								us.save().then((newUser)=>{
								console.log('new user created:'+newUser);
								done(null,newUser);
								});


			}
	});


	})

	
	})

);


