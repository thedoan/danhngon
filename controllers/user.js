var User = require('../models/User');
module.exports = {
	index: function(req, res){
		if(req.isAuthenticated()){
			res.render('../views/user/index',{
				title: req.user.name,
				name: req.user.name,
				email: req.user.email,
				userID: req.user._id,
				user: req.user
			});
		}else{
			res.redirect('/login');
		}
	},
	create: function(req, res){
		res.render('../views/user/create');	
	},
	doCreate: function(req, res){
		/*
		   let user = new User({
		   name: req.body.name,
		   email: req.body.email		
		   });
		   user.save( function( err, user ){
		   if(!err){
		   res.send(user);
		   console.log('Saved user name: ' + user.name);
		   console.log('_id of saved user: ' + user._id);
		   }
		   });
		   */
		//or Chaining methods
		let user = new User({
			name: req.body.name,
			email: req.body.email,
			password: User.generateHash(req.body.password)		
		}).save( function( err, user ){
			if(err){
				console.log(err);
				if(err.code===11000){
					res.redirect('/user/new?exists=true');
				}else{
					res.redirect('/?error=true');
				}
			}else{
				req.session.user = { "name" : user.name, "email": user.email, "_id": user._id };
				req.session.loggedIn = true;
				res.redirect('/user');
				console.log('Saved user name: ' + user.name);
				console.log('_id of saved user: ' + user._id);
			}
		});
		//or Model.create()
		/*
		   User.create({
		   name: req.body.name,
		   email: req.body.email		
		   },function(err, user){
		   if(!err){
		   res.send(user);
		   console.log('Saved user name: ' + user.name);
		   console.log('_id of saved user: ' + user._id);
		   }

		   });
		   */
		/*
		   console.log("name:"+req.body.name);
		   console.log("email:"+req.body.email);
		   console.log("password:"+req.body.password);
		   console.log("re-password:"+req.body.repassword);
		   */
	},
	edit: function(req, res){

	},
	doEdit: function(req, res){

	},
	confirmDelete: function(req, res){

	},
	doDelete: function(req, res){

	},
	login: function(req, res){
		/*
		if(req.query.404){
			if(req.query.404 == 'user'){
				res.send("User doesn't exist");
				//user not exist
			}else if(req.query.404 == 'error'){
				res.send("Error happened");
				//has error
			}else{
				res.send("Unexpected error");
				//un expected error
			}
		}else{
			res.render('../views/user/login');
		}
		*/
		res.render('../views/user/login');
	},
	doLogin: function(req, res){
		if (req.body.email) {
			console.log("email:"+req.body.email);
			User.findOne(
					{'email' : req.body.email},
					'_id name email',
					function(err, user) {
						if (!err) {
							if (!user){
								res.redirect('/user/login?404=user');
							}else{
								req.session.user = {
									"name" : user.name,
									"email": user.email,
									"_id": user._id
								};
								req.session.loggedIn = true;
								console.log('Logged in user: ' + user);
								res.redirect( '/user' );
							}
						} else {
							res.redirect('/user/login?404=error');
						}
					});
		} else {
			res.redirect('/user/login?404=error');
		}
	},
	doLogout: function(req, res){

	},	
	profile: function(req, res){
		res.render('../views/user/profile',{user: req.user});	
	}
}
