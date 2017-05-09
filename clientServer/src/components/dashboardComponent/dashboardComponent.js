import React, { Component } from "react";
import $ from "jquery";
import { Link, Redirect } from "react-router-dom";
// import cookies  from 'react-cookie';
// import logo from './logo.svg';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Card from "../cardComponent/cardComponent.jsx";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			affiliation: [],
			isAdmin: false,
			redirect: false
		};
		this.reload = this.reload.bind(this);
	}

	componentDidMount() {
		this.getAffiliation();
	}

	getAffiliation() {
		let url = "http://localhost:4000/api/display";
		$.ajax({
			url: url,
			type: "GET",
			xhrFields: {
				withCredentials: true
			},
			success: function(json) {
				if (json.success) {
					this.setState({
						affiliation: json.data,
						isAdmin: json.isAdmin,
						redirect: !json.isAdmin
					});
				}
			}.bind(this),
			error: function(error) {
				console.log("no network");
			}
		});
	}

	logout() {
		let url = "http://localhost:4000/api/logout";

		$.ajax({
			url: url,
			type: "GET",
			xhrFields: {
				withCredentials: true
			},
			success: function(json) {
				var cookies = document.cookie.split(";");
				for (var i = 0; i < cookies.length; i++) {
					console.log(cookies[i]);
				}
			},
			error: function(error) {
				console.log("no network");
			}
		});
	}

	reload() {
		this.getAffiliation();
	}
	render() {
		if (this.state.redirect) return <Redirect to={{ pathname: "/home" }} />;

		const data = this.state.affiliation;

		return (
			<div className="App">
				<a onClick={this.logout}> Logout </a>
				<div>
					<Card
						card={data}
						callBackReload={this.reload}
						isAdmin={this.state.isAdmin}
					/>
				</div>
			</div>
		);
	}
}

export default App;
