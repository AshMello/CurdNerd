import React, {Component} from 'react';
import axios from 'axios';
import {setAuthenticationHeader} from '../utils/authenticate';
import {connect} from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import './Login.css';

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
            <div className="container">
            <Form className="fullForm">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control name="username" onChange={this.handleTextBoxChange} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label >Password</Form.Label>
                    <Form.Control name="password" onChange={this.handleTextBoxChange} />
                </Form.Group>
                <Button className="button" onClick={this.handleLoginClick}>
                    Login
                </Button>
            </Form>
            </div>
        
        //     <div>
        //         <input name="username" onChange={this.handleTextBoxChange} placeholder='username'></input>
        //         <input name="password" onChange={this.handleTextBoxChange} placeholder='password'></input>
        //         <Button variant="secondary" onClick={this.handleLoginClick}>Login</Button>
        //     </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthenticated: (token,userId) => dispatch({type: 'ON_AUTHENTICATED', token: token, id:userId})
    }
}

export default connect(null, mapDispatchToProps)(Login)