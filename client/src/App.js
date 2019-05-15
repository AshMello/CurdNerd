import React, {Component} from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import {Jumbotron} from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div className="allThings">
      <Jumbotron className="jumbo">
          <h1>Welcome to CurdNerd,</h1>
          <h3>
           A place where cheese enthusiasts can catalog their favorite cheeses and cheeseboards.
          </h3>
      </Jumbotron>

      <div>
       <h2 className="head">Login</h2>
       <br></br>
        <Login />
        <br></br>
       {/* <h2 className="head">Or</h2> */}
       <h2 className="head">Create an Account</h2>
       <Register />
       </div>
       </div>
    )
  }
}



export default App;
