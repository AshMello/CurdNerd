import React, {Component} from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register'

class App extends Component {
  render() {
    return (
      <div>
      <h3>Login</h3>
      <Login />
      <h2>Or</h2>
      <h3>Create an Account</h3>
      <Register />
      </div>
    )
  }
}



export default App;
