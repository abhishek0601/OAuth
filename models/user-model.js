const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const userSchema=new Schema({

	google:{
		username:String,
		googleId:String
	},
	facebook:{
		username:String,
		facebookId:String
	}
});



const User=mongoose.model('user',userSchema);

module.exports=User;