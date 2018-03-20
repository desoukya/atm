import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator} from 'react-material-ui-form-validator';
import request from 'superagent';

const loginUrl = 'http://localhost:3001/users/login';
const usernameRegex = '^[a-zA-Z0-9_-]{3,16}$';
const passwordRegex = '^[a-zA-Z0-9_-]{0,20}$';

export default class LogInForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn			: false,
			username 			: '',
			password			: '',
			logInFailMsg	: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({[event.currentTarget.name] : event.currentTarget.value});
		this.refs[event.currentTarget.name].validate(event.currentTarget.value);
	}

	handleSubmit(event) {
		event.preventDefault();
		const payload = {
			username : this.state.username,
			password : this.state.password
		};
		
		request.post(loginUrl)
		.set('Content-Type', 'application/json')
		.send(payload)
		.end((err, res) => {
			if(err) {
				this.setState({ logInFailMsg : 'Incorrect username or password'});
			} else {
				this.setState({ logInFailMsg : ''});
				(this.props.action)(res.body);
			}
		});
	}
 
	render() {
		return (
			<ValidatorForm
				ref='loginForm' 
				onSubmit={this.handleSubmit}
				onError={errors => console.log(errors)}
				>
				<h1 id={'header'}>Login</h1>
				<div>{this.state.logInFailMsg}</div> {/* TODO set style */}
				<TextValidator
					name='username'
					ref='username'
					hintText="Username"
					validators={['required', `matchRegexp:${usernameRegex}`]}
					errorMessages={['this field is required','invalid username']}
					floatingLabelText="Username"
					onChange={event => this.handleChange(event)}
					value={this.state.username}
					/><br />
				<TextValidator
					name='password'
					id='passwordField'
					ref='password'
					validators={['required', `matchRegexp:${passwordRegex}`]}
					errorMessages={['this field is required','invalid password']}
					floatingLabelText="Password"
					type="password"
					onChange={event => this.handleChange(event)}
					value={this.state.password}
					/><br />
				<RaisedButton label="Submit"
					type='submit' 
					primary={true} 
					/>
			</ValidatorForm>
		);
	}
}
