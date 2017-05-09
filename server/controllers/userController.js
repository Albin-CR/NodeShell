"use strict";

import User from "../model/userModel";

const userController = {};

//NOTE - Register -

userController.register = (req, res) => {
	const { username, password, email, phno } = req.body;

	// NOTE Validation if necessory

	const user = new User({
		username,
		password,
		email,
		phno
	});

	user
		.save()
		.then(newUser => {
			res.json({
				success: true,
				data: newUser,
				albin: "ok"
			});
		})
		.catch(error => {
			if (error.code == 11000) {
				return res.json({
					success: false,
					message: "Email already exists",
					error: error
				});
			} else {
				return res.json({
					success: false,
					message: "Failed to register",
					error: error
				});
			}
		});
};

//NOTE - Login -

userController.login = (req, res) => {
	const { username, password } = req.body;
	console.log(req.body, req.body.username);
	User.findOne({ username: username }, function(error, obj) {
		if (obj != null && obj.password == password) {
			req.session.username = req.body.username;

			return res.json({
				success: true,
				data: "logged in successfully"
			});
		} else {
			return res.json({
				success: false,
				message: "User dose not exist",
				error: error
			});
		}
	});
};

//NOTE - logout -

userController.logout = (req, res) => {
	// return request.session.destroy();
	req.session.destroy(error => {
		if (error) {
			return res.json({
				success: false,
				message: "User dose not exist",
				error: error
			});
		} else {
			return res.json({
				success: true,
				data: "logged out successfully"
			});
		}
	});
};

export default userController;
