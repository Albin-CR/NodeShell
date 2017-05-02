import React, { Component } from 'react';
import $ from 'jquery'
// import cookies  from 'react-cookie';
// import logo from './logo.svg';
import { BrowserRouter as Router,Route,Link } from 'react-router-dom'


class App extends Component {

constructor(props){
  super(props)
  this.state = {
    affiliation:[]
};
}

componentDidMount() {

    this.getAffiliation()

}

 getAffiliation() {

  let url = "http://localhost:4000/api/display"

$.ajax({
        url: url,
        type: 'GET',
        xhrFields: {
              withCredentials: true
        },
        success: function (json) {
          this.setState({ affiliation: json.data })
        }.bind(this),
        error: function (error) {
              console.log(("no network"));
        }
      });

}

  render() {

    var affiliations = this.state.affiliation.map((item,index) =>{

      return ( <li key={item._id}>

        <p>{item.company}</p>
        <p>{item.type}</p>
        <p>{item.weblink}</p>
        <p>{item.description}</p>
        <p>{item.active}</p>
        <p>{item.created}</p>
        <p>{item.updated}</p>
        <img alt="" src={"http://localhost:4000/" + item.image} />
        <Link to="/login">Login</Link>
      </li>)
  });
    return (

      <div className="App">
        <div >{ affiliations }</div>
      </div>

    );
  }

}

export default App;
