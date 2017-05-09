"use strict";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
import Affliction from "../model/afflictionModel";

import gm from "gm";
const imageMagick = gm.subClass({ imageMagick: true });
import fs from "fs";

const afflictionController = {};

//NOTE - Create -

afflictionController.create = (req, res) => {
	if (req.session.username != null || req.session.username != undefined) {
		const currentImage = req.file;
		const parameters = req.body;

		var gmCreater = (imagePath, newImagePath, width, height) => {
			imageMagick(imagePath)
				.resizeExact(width, height)
				.write(newImagePath, function(err) {
					if (!err) console.log("done");
				});
		};

		var width = 200;
		var height = 200;
		console.log(req.file, "asdadsdas");
		const newImagePath =
			currentImage.destination +
			currentImage.filename +
			"_thumb." +
			currentImage.mimetype.split("/")[1];

		gmCreater(currentImage.path, newImagePath, width, height);

		const affliction = new Affliction({
			company: parameters.company,
			type: parameters.type,
			weblink: parameters.weblink,
			description: parameters.description,
			image: currentImage.path,
			active: parameters.active
		});

		affliction
			.save()
			.then(newAffliction => {
				res.json({
					success: true,
					data: newAffliction
				});
			})
			.catch(error => {
				return res.json({
					success: false,
					message: "Couldn't create. Try again after sometime.",
					error: error
				});
			});
	} else {
		return res.json({
			success: false,
			message: "Your not logged in."
		});
	}
};

//NOTE - Display -

afflictionController.display = (req, res) => {
	var isAdmin = false;
	if (req.session.username != null || req.session.username != undefined) {
		console.log(req.session.username);
		isAdmin = true;
	}
	Affliction.find((error, affliction) => {
		console.log({
			success: true,
			isAdmin: isAdmin
		});
		if (error == null) {
			res.json({
				success: true,
				data: affliction,
				isAdmin: isAdmin
			});
		} else {
			res.json({
				success: false,
				message: "Dose not exist.",
				error: error
			});
		}
	});
};

//NOTE - Remove -

afflictionController.remove = (req, res) => {
	console.log(req.session);
	if (req.session.username != null || req.session.username != undefined) {
		Affliction.findOne({ _id: req.body.id }, (error, data) => {
			if (error == null) {
				Affliction.remove({ _id: req.body.id }, (error, data) => {
					// res.redirect("/api/display");
					res.json({
						success: true,
						data: Affliction,
						error: error
					});
				});
			} else {
				res.json({
					success: false,
					message: "Item dose not exist.",
					error: error
				});
			}
		});
	} else {
		res.json({
			success: false,
			message: "You are not logged in."
		});
	}
};

export default afflictionController;
