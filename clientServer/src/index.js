import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./components/homeComponent/homeComponent.js";
import Login from "./components/loginComponent/loginComponent.js";
import Create from "./components/createComponent/createComponent.js";
import Dashboard from "./components/dashboardComponent/dashboardComponent.js";
import "./index.css";

ReactDOM.render(
	<Router>
		<div>
			<p>Albin</p>
			<Route exact={true} path="/" component={Dashboard} />
			<Route path="/home" component={Home} />
			<Route path="/login" component={Login} />
			<Route path="/create" component={Create} />
		</div>
	</Router>,
	document.getElementById("root")
);
