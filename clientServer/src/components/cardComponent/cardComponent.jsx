import React, { Component } from "react";
import $ from "jquery";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false
		};
	}

	removeFromList(id) {
		const url = "http://localhost:4000/api/remove";
		$.ajax({
			url: url,
			type: "POST",
			dataType: "json",
			data: { id: id },
			xhrFields: {
				withCredentials: true
			},
			success: function(json) {
				console.log(json, "end");
				if (json.success) {
					this.reload();
				}
			}.bind(this),
			error: function(error, status, xhr) {
				console.log(error, status, xhr);
			}
		});
	}
	reload() {
		this.props.callBackReload();
	}
	render() {
		var style = {
			width: "100px",
			height: "100px"
		};

		const affiliations = this.props.card.map((card, index) => {
			const isAdmin = this.props.isAdmin;

			return (
				<li key={card._id}>
					<p>{card.company}</p>
					<p>{card.type}</p>
					<p>{card.weblink}</p>
					<p>{card.description}</p>
					<p>{card.active}</p>
					<p>{card.created}</p>
					<p>{card.updated}</p>
					<img
						alt=""
						style={style}
						src={"http://localhost:4000/" + card.image}
					/>
					{isAdmin
						? <a key={card._id} onClick={() => this.removeFromList(card._id)}>
								{" "}Remove{" "}
							</a>
						: ""}
				</li>
			);
		});
		return <div> {affiliations} </div>;
	}
}

export default App;
