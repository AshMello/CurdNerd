import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

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
            <ul>
                <li><NavLink to = '/'>Home</NavLink></li>
                <li><NavLink to = '/journal'>Journal</NavLink></li>
                {/* <li><NavLink to = '/cheeseboard'>Build A Board</NavLink></li> */}
                {this.props.isAuthenticated ?   <li><a onClick={this.handleLogoutClick} href="#">Logout</a></li> : null }
            </ul>
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