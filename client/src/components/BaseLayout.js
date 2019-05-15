import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Nav,Navbar} from 'react-bootstrap'

class Menu extends Component {
    handleLogoutClick = () => {
        console.log(this.props.isAuthenticated)
        localStorage.removeItem('jsonwebtoken')
        this.props.logout()
        this.props.history.push('/')
        console.log("logged out")
    }

    render() {
        return (

            <Navbar className="NavBg" bg="black">
                <Navbar.Brand style={{color: 'white'}} href="#home">CurdNerd</Navbar.Brand>
                <Nav className="mr-auto">
                {/* <Nav.Link href="#">Home</Nav.Link> */}
                <Nav.Link href="/journal"><NavLink className='link' to = '/journal'>Journal</NavLink></Nav.Link>
                <Nav.Link href="/viewall"><NavLink className='link' to = '/viewall'>View Journal</NavLink></Nav.Link>
                <Nav.Link href="/cheeseboard"><NavLink className='link' to = '/cheeseboard'>Build a Board</NavLink></Nav.Link>
                {this.props.isAuthenticated ? <Nav.Link href="#"><li><a className='link' onClick={this.handleLogoutClick} href="#">Logout</a>
                </li></Nav.Link> : null }
                </Nav>
            </Navbar>
            // <ul>
            //     <li><NavLink to = '/'>Home</NavLink></li>
            //     <li><NavLink to = '/journal'>Journal</NavLink></li>
            //     <li><NavLink to = '/viewall'>View Journal</NavLink></li>
            //     {this.props.isAuthenticated ?   <li><a onClick={this.handleLogoutClick} href="#">Logout</a></li> : null }
            // </ul>
        )
    }
}
class BaseLayout extends Component {
        
    render() {
        return (
            <div>
                <Menu isAuthenticated={this.props.isAuthenticated} logout={this.props.onLogout} history={this.props.history} />
                {this.props.children}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.isAuthenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch({type: 'LOGOUT'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BaseLayout))