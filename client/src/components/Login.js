import React, {Component} from 'react';
import axios from 'axios';
import {setAuthenticationHeader} from '../utils/authenticate';
import {connect} from 'react-redux'

class Login extends Component {

    constructor() {
        super()

        this.state = {
            username: '',
            password: ''
        }
    }

    handleLoginClick = () => {

        axios.post('http://localhost:8080/login', {
            username: this.state.username,
            password: this.state.password
        }).then(response => {
            let token = response.data.token
            let userId = response.data.id
            console.log(token, userId)
            localStorage.setItem('jsonwebtoken', token)
            this.props.onAuthenticated(token,userId)
            setAuthenticationHeader(token)
        }).catch(error => console.log(error))
    }

    handleTextBoxChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <input name="username" onChange={this.handleTextBoxChange} placeholder='username'></input>
                <input name="password" onChange={this.handleTextBoxChange} placeholder='password'></input>
                <button onClick={this.handleLoginClick}>Login</button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthenticated: (token,userId) => dispatch({type: 'ON_AUTHENTICATED', token: token, id:userId})
    }
}

export default connect(null, mapDispatchToProps)(Login)