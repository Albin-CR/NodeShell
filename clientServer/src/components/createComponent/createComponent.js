import React, { Component } from "react";
import $ from "jquery";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			company: "",
			type: "",
			weblink: "",
			description: "",
			image: "",
			active: ""
		};

		this.setFormData = this.setFormData.bind(this);
		this.create = this.create.bind(this);
	}

	create(event) {
		event.preventDefault();
		const company = this.state.company;
		const type = this.state.type;
		const weblink = this.state.weblink;
		const description = this.state.description;
		const image = this.state.image;
		const active = this.state.active;

		// (this.state).forEach((item) => {
		//
		//       console.log(item)
		//
		// })

		var formData = new FormData();
		formData.append("image", image);
		formData.append("company", company);
		formData.append("type", type);
		formData.append("weblink", weblink);
		formData.append("description", description);
		formData.append("active", active);

		$.ajax({
			type: "POST",
			enctype: "multipart/form-data",
			cache: false,
			processData: false,
			contentType: false,
			xhrFields: {
				withCredentials: true
			},
			url: "http://localhost:4000/api/create",
			dataType: "json",
			data: formData
		})
			.done(function(data, status, xhr) {
				console.log(data, status, xhr);
			})
			.fail(function(xhr, status, err) {
				console.log(err, xhr, status);
			});
	}

	setFormData(event) {
		const key = event.target.name;
		const value = event.target.value;

		switch (key) {
			case "company":
				this.setState({ company: value });
				break;

			case "type":
				console.log(event.target);
				this.setState({ type: value });
				break;

			case "weblink":
				this.setState({ weblink: value });
				break;

			case "description":
				this.setState({ description: value });
				break;

			case "active":
				this.setState({ active: value });
				break;

			case "image":
				const file = event.target.files[0];
				this.setState({ image: file });
				break;

			default:
				break;
		}
	}

	render() {
		return (
			<div>
				<form onSubmit={this.create} encType="multipart/form-data">

					<div>
						<label><b>Company</b></label>
						<input
							type="text"
							placeholder="Enter company name"
							name="company"
							required
							onChange={this.setFormData}
						/>
					</div>
					<div>
						<label><b>Affliction</b></label>
						<input
							type="text"
							placeholder="Enter affliction link / website "
							name="weblink"
							required
							onChange={this.setFormData}
						/>
					</div>
					<div>
						<label><b>Description</b></label>
						<input
							type="text"
							placeholder="Enter description"
							name="description"
							required
							onChange={this.setFormData}
						/>
					</div>
					<div>
						<label><b>Affliction Type</b></label>
						<select
							required
							value={this.state.type}
							name="type"
							onChange={this.setFormData}
						>
							<option defaultValue value="">Select your option</option>
							<option value="affliction">Affliction</option>
							<option value="code">Code</option>
						</select>
					</div>
					<div>
						<label><b>Active</b></label>
						<select
							required
							value={this.state.active}
							name="active"
							onChange={this.setFormData}
						>
							<option defaultValue value="">Select your option</option>
							<option value="true">Active</option>
							<option value="false">InActive</option>
						</select>
					</div>
					<div>
						<input type="file" name="image" onChange={this.setFormData} />
					</div>

					<input type="submit" value="Save" />

				</form>
			</div>
		);
	}
}

export default App;
