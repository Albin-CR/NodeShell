import React from "react";
// import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../components/homeComponent/homeComponent.js";
import Login from "../components/loginComponent/loginComponent.js";
import Create from "../components/createComponent/createComponent.js";
import Dashboard from "../components/dashboardComponent/dashboardComponent.js";

const router = (
	<Router>
		<div>
			<p>Albin</p>

			<Route exact={true} path="/" component={Home} />
			<Route path="/Home" component={Home} />
			<Route path="/login" component={Login} />
			<Route path="/create" component={Create} />
			<Route path="/dashboard" component={Dashboard} />

		</div>
	</Router>
);

export default router;
