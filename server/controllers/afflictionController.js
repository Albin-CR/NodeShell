"use strict";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
import Affliction from "../model/afflictionModel";

import gm from "gm";
const imageMagick = gm.subClass({ imageMagick: true });
import fs from "fs";

const afflictionController = {};

afflictionController.create = (req, res) => {
	console.log(req);

	if (req.session.username != null) {
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
				res.status(200).json({
					affliction: newAffliction
				});
			})
			.catch(error => {
				return res.status(500).json({
					message: error,
					error: "failed to create"
				});
			});
	} else {
		return res.json({
			error: "You are not logged in."
		});
	}
};

afflictionController.display = (req, res) => {
	console.log(req.session, "albin");
	Affliction.find((err, data) => {
		if (err == null) {
			res.status(200).json({
				data: data
			});
		} else {
			res.status(500).json({
				error: err
			});
		}
	});
};

afflictionController.remove = (req, res) => {
	console.log(req.body.id);
	// if (req.session.username != null) {
	Affliction.findOne({ _id: req.body.id }, (err, data) => {
		console.log(err, data, "_____________________________");
		if (err == null) {
			Affliction.remove({ _id: req.body.id }, (err, data) => {
				res.redirect("/api/display");
			});
		} else {
			console.log("not found");
			res.redirect("/");
		}
	});
	// } else {
	// 	res.redirect("/");
	// }
};

export default afflictionController;
