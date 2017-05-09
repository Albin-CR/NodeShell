import React, { Component } from "react";
import $ from "jquery";
import { Link, Redirect } from "react-router-dom";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: "",
			redirect: false
		};

		this.setFormData = this.setFormData.bind(this);
		this.login = this.login.bind(this);
	}

	login(event) {
		event.preventDefault();
		const username = this.state.username;
		const password = this.state.password;

		$.ajax({
			type: "POST",
			xhrFields: {
				withCredentials: true
			},
			url: "http://localhost:4000/api/login",
			data: {
				username: username,
				password: password
			}
		})
			.done(
				function(data, status, xhr) {
					console.log(data);
					if (data.success) {
						this.setState({ redirect: true });
					}
				}.bind(this)
			)
			.fail(function(xhr, status, err) {
				console.log(err);
			});
	}

	setFormData(event) {
		const key = event.target.name;
		const value = event.target.value;

		switch (key) {
			case "username":
				this.setState({ username: value });
				break;

			case "password":
				this.setState({ password: value });
				break;

			default:
				break;
		}
	}

	render() {
		if (this.state.redirect)
			return <Redirect to={{ pathname: "/dashboard" }} />;

		return (
			<div>
				<form onSubmit={this.login}>
					<div>

						<label><b>Username</b></label>
						<input
							type="text"
							placeholder="Enter Username"
							name="username"
							required
							onChange={this.setFormData}
						/>

						<label><b>Password</b></label>
						<input
							type="password"
							placeholder="Enter Password"
							name="password"
							required
							onChange={this.setFormData}
						/>

					</div>

					<input type="submit" value="login" />

				</form>

				<Link to="/home">Login</Link>
			</div>
		);
	}
}

export default App;
