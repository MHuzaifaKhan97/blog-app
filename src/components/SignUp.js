import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { auth } from '../firebase/firebase';

class SignUp extends Component {

    state = {
        email: '',
        password: '',
        user:''
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    userSignup = () => {
        console.log(this.state.email, this.state.password)
        if (this.state.email === "") {
            alert("Please enter your email");
        } else if (this.state.password === "") {
            alert("Please enter your password");
        } else {
            auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((response) => {
                    alert("User Successfully Created.")
                })
                .catch((error) => {
                    alert(error.message);
                })
        }
    }
    componentDidMount() {
        auth.onAuthStateChanged((res) => {
            console.log(res)
            this.setState({
                user: res
            })
        })
    }
    render() {
        return (
            <>
            {
                this.state.user ? 
                <Redirect to='/' />
                :
                <div className="container login_main">
                <div className="row post-parent">
                    <div className="col-md-8 offset-md-2 my-5 post">
                        <h3 className="text-center font-weight-bold my-3">
                            <span className="heading_1">b</span>
                            <span className="heading_2">-Logs </span>
                            - Sign Up
                        </h3>
                        <div className="form-group">
                            <input className="form-control" type="email" placeholder="Enter Email..." name="email" onChange={(e) => this.onInputChange(e)} />
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="password" placeholder="Enter Password..." name="password" onChange={(e) => this.onInputChange(e)} />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary btn-block" onClick={this.userSignup} >
                                <span className="fa fa-sign-in mx-2"></span>
                                <span className="font-weight-bold">Create User</span>
                            </button>
                        </div>
                        <hr />
                        <p className="text-center font-weight-bold">OR</p>
                        <hr />
                        <div className="form-group">
                            <Link to='/login' className="text-white" >
                                <button className="btn btn-dark btn-block">
                                    <span className="fa fa-sign-out mx-2"></span>
                                    <span className="font-weight-bold">Login</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
      
            }
            </>
        )
    }
}
export default SignUp;