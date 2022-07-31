import axios from 'axios';
import React, { Component } from 'react';

export default class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.OnSubmit = this.OnSubmit.bind(this);

        this.state = {
            email: '',
            password: '',
        }
    }

    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    OnSubmit = (e) => {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
        }
        axios.post('http://localhost:5000/users/forget_password', user)
            .then(res => {
                if (res.data === 'invalid') {
                    window.location = '/invalidAuth';
                } else {
                    window.location = '/login';
                    alert('Password has been changed');
                }
            })
    }

    render() {
        return (
            <form onSubmit={this.OnSubmit}>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" onChange={this.onChangeEmail} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label>New Password</label>
                    <input type="password"  onChange={this.onChangePassword} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <div className="form-group form-check">
                    <button type='submit'>Done</button>
                </div>
            </form>
        )
    }
}