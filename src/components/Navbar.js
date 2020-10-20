import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { auth } from '../firebase/firebase';

class Navbar extends Component {

    state = {
        user: ''
    }

    componentDidMount() {
        auth.onAuthStateChanged((res) => {
            console.log(res)
            this.setState({
                user: res
            })
        })
    }
    logOut = () => {
        auth.signOut()
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg fixed-top navbar-dark custom_navbar py-1">
                <div className="container">
                    <Link to='/'>
                        <h1 className='navbar-brand font-weight-bold'>
                            <span className="heading_1">b</span>
                            <span className="heading_2">-Logs</span>
                        </h1>
                    </Link>
                    <button className="navbar-toggler" data-toggle="collapse" data-target="#navbar">
                        <span className="navbar-toggler-icon"> </span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbar">
                        <ul className="navbar-nav ml-auto" id="navbar">
                            <li className="nav-item">
                                <Link to='/' className="nav-link links">
                                    <span className="fa fa-home mx-1 text-warning"></span>
                                Home
                                </Link>
                            </li>
                            {
                                this.state.user ?
                                    <li className="nav-item">
                                        <button onClick={this.logOut} className="btn btn-danger nav-link text-white mx-3" to='/login'>
                                            <span className="fa fa-sign-out mx-1 text-warning"></span>
                                logout
                                </button>
                                    </li>
                                    :
                                    <li className="nav-item">
                                        <Link to='/login' className="nav-link links">
                                            <span className="fa fa-sign-in mx-1 text-warning"></span>
                                    Login
                                    </Link>
                                    </li>
                            }


                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;
