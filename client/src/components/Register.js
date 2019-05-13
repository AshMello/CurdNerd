import React, {Component} from 'react';
import { connect } from 'react-redux';

class Register extends Component {

    constructor() {
        super()

        this.state = {
            username:'',
            password:''
        }
    }

    handleRegisterClick = () => {
        fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        }).then(response => response.json())
        .then(result => {
            console.log(result)
            if(result.success) {
                this.setState({
                    message: result.message
                })
            }
        })
    }

    handleTextBoxChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return(
            <div>
                <input name="username" onChange={this.handleTextBoxChange} placeholder='username'></input>
                <input name="password" onChange={this.handleTextBoxChange} placeholder='password'></input>
                <button onClick={this.handleRegisterClick}>Register</button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthenticated: (token) => dispatch({type: 'ON_AUTHENTICATED', token: token})
    }
}

export default connect(null, mapDispatchToProps)(Register);