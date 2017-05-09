import React from "react";
import ReactDOM from "react-dom";
import routes from "./router/router.js";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";

const Routes = (
	<Router history={history}>
		{routes}
	</Router>
);

const app = document.getElementById("root");

ReactDOM.render(Routes, app);
