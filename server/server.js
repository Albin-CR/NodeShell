// "use strict";
import path from "path";
import helmet from "helmet";
import logger from "morgan";
import express from "express";
import compress from "compression";
import favicon from "serve-favicon";

// NOTE - Database
import mongoose from "mongoose";

// NOTE - Parser imports
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

// NOTE - Session imports
import session from "express-session";
import redis from "redis";
const client = redis.createClient();
import redisStoreForSession from "connect-redis";
const redisStore = redisStoreForSession(session);

// NOTE - Image processing imports
import multer from "multer";
import crypto from "crypto";

var allowCrossDomain = function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
	// res.header("Access-Control-Allow-Headers", "Content-Type");
	res.header("Access-Control-Allow-Credentials", true);
	next();
};

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		console.log(req.session);
		require("fs").mkdir("uploads/" + req.session.username + "/", err => {
			cb(null, "./uploads/" + req.session.username + "/");
		});
	},
	filename: (req, file, cb) => {
		crypto.pseudoRandomBytes(16, (err, raw) => {
			if (err) return cb(err);
			const newPath = raw.toString("hex") + path.extname(file.originalname);
			cb(null, newPath);
		});
	}
});

var upload = multer({ storage: storage });
// const upload = multer({ dest: "uploads/" });

// NOTE -methodOverride for header - NOTE not using -
import methodOverride from "method-override";

// NOTE - user import
import config from "./config/";
import userController from "./controllers/userController";
import afflictionController from "./controllers/afflictionController";

// NOTE - Main App

const app = express();

// NOTE - Set
app.set("view engine", "ejs");
app.set("view", path.join(config.root, "views"));

// NOTE - Use
app.use(allowCrossDomain);
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(logger("dev"));
app.use(express.static(path.join(config.root, "/uploads")));
// app.use(favicon(path.join(config.root, "static/img/favicon.png")));
//
app.use(
	session({
		secret: "2tb678978tc786r3tn78789rwrb7r3t70 r3bt789n0cwtn89w0890xbt0r3qt78br3b78r378qr3b73Q",
		store: new redisStore({
			host: "localhost",
			port: 6379,
			client: client,
			disableTTL: true,
			logErrors: true
		}),
		saveUninitialized: false,
		resave: false
	})
);

import User from "./model/userModel";

// const isAuthenticated = (req, res, next) => {
// 	const sessionKey = req.session.username;
// 	console.log("session", sessionKey);
// 	User.findOne({ username: sessionKey }, function(error, obj) {
// 		console.log(obj);
// 		if (obj != null) {
// 			next();
// 		} else {
// 			return res.json({
// 				success: false,
// 				message: "User not logged in",
// 				error: error
// 			});
// 		}
// 	});
// };

// NOTE - Use routes
app.use("/uploads", express.static(__dirname + "/uploads"));
app.post("/api/register", userController.register);
app.post("/api/login", userController.login);
app.get("/api/logout", userController.logout);

app.post("/api/create", upload.single("image"), afflictionController.create);
app.get("/api/display", afflictionController.display);
app.post("/api/remove", afflictionController.remove);

// NOTE - 404 Handler

app.get("/", (req, res) => {
	res.json({
		success: true,
		message: { req }
	});
});

// NOTE - catch 404 and forward to error handler

app.use((req, res, next) => {
	const err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// NOTE - general errors

app.use((err, req, res, next) => {
	console.log("general errors");
	const sc = err.status || 500;

	res.json({
		success: false,
		status: res.status(sc).stringify,
		message: err.message,
		stack: config.env === "development" ? err.stack : ""
	});
});

// NOTE - Mongoose setup
// NOTE -  warn if MONGOURI is being used and pass is undefined

if (config.db === process.env.MONGOURI && !config.pass)
	console.log(`bad credientials for ${config.db} -- check env.`);
mongoose.connect(config.db, {
	user: config.user,
	pass: config.pass
});

const db = mongoose.connection;
db.on("error", () => {
	throw new Error(`unable to connect to database at ${config.db}`);
});

// START AND STOP

const server = app.listen(config.port, () => {
	console.log(`listening on port ${config.port}`);
});

process.on("SIGINT", () => {
	console.log("shutting down!");
	db.close();
	server.close();
	process.exit();
});
