import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Route,Link } from 'react-router-dom'
import Home from './components/homeComponent/homeComponent.js';
import Login from './components/loginComponent/loginComponent.js';
import './index.css';

ReactDOM.render(

  ( <Router>
      <div>
        <p>Albin</p>
          <Route exact={true} path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
      </div>
   </Router>

),
  document.getElementById('root')
);
