import React, { Component } from "react";
import $ from "jquery";
import Card from "../cardComponent/cardComponent.jsx";
// import cookies  from 'react-cookie';
// import logo from './logo.svg';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			affiliation: []
		};
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
					this.setState({ affiliation: json.data });
				}
			}.bind(this),
			error: function(error) {
				console.log("no network");
			}
		});
	}

	render() {
		const data = this.state.affiliation;
		return (
			<div className="App">
				<Card card={data} />
			</div>
		);
	}
}

export default App;
