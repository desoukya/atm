import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator } from 'react-material-ui-form-validator';
import request from 'superagent';
// import bcrypt from 'bcrypt';

const registerUrl = 'http://localhost:3001/users/register';
const nameRegex = '^[a-zA-Z][a-zA-Z -]{0,30}$';
const usernameRegex = '^[a-zA-Z0-9_-]{3,16}$';
const passwordRegex = '^[a-z0-9_-]{6,20}$';

const styles = {
	checkbox: {
		width: '5%',
		marginBottom: 16
	}
};

export default class RegisterForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName 			: '',
			lastName  			: '',
			username				: '',
			email						: '',
			password				: '',
			confPassword		: '',
			checkingChecked	: false,
			savingsChecked	: false,
			accountErrorMsg	: null,
			takenUsernames	: []
		}

		this.handleChange  = this.handleChange.bind(this);
		this.handleSubmit  = this.handleSubmit.bind(this);
		this.updateCheckChecking = this.updateCheckChecking.bind(this);
		this.updateCheckSavings = this.updateCheckSavings.bind(this);
		this.getUnavailableUsernames = this.getUnavailableUsernames.bind(this);
	}

	componentWillMount() {
		this.getUnavailableUsernames();
		ValidatorForm.addValidationRule('matchesPassword', value => value === this.state.password);
	}

	getUnavailableUsernames() {
		console.log('')
	}

	handleChange(event) {
		this.setState({[event.currentTarget.name] : event.currentTarget.value});
		this.refs[event.currentTarget.name].validate(event.currentTarget.value);
	}

	handleSubmit(event) {
		event.preventDefault();

		if(this.state.checkingChecked || this.state.savingsChecked) {
			this.setState({
				accountErrorMsg : null
			});

			const accounts = [];
			this.state.checkingChecked ? accounts.push('checking') : null;
			this.state.savingsChecked  ? accounts.push('saving') : null;

			const payload = {
				firstName : this.state.firstName,
				lastName  : this.state.lastName,
				username	: this.state.username,
				email			: this.state.email,
				password  : this.state.password,
				accounts	: accounts
			};
			
			request.post(registerUrl)
			.set('Content-Type', 'application/json')
			.send(payload)
			.end((err, res) => {
				if(err) {
					console.log(err.body);
				}
				else {
					console.log(res.body);
				}
			});
		} else {
			this.setState({
				accountErrorMsg : 'Please select an account type'
			});
		}
	}

	updateCheckChecking() {
		this.setState((oldState) => {
			return {
				checkingChecked: !oldState.checkingChecked,
			};
		});
	}

	updateCheckSavings() {
		this.setState((oldState) => {
			return {
				savingsChecked: !oldState.savingsChecked,
			};
		});
	}

	render() {
		return (
			<ValidatorForm
				ref='form' 
				onSubmit={this.handleSubmit}
				onError={errors => console.log(errors)}
				>
				<div style={{width: 'fit-content', marginLeft: 'auto', marginRight: 'auto'}}>
					<h1 id={'header'}>Register</h1>	
					<TextValidator name='firstName'
						ref='firstName'
						hintText="First Name"
						validators={['required', `matchRegexp:${nameRegex}`]}
						errorMessages={['this field is required','invalid name']}
						floatingLabelText="First Name"
						onChange={event => this.handleChange(event)}
						value={this.state.firstName}
						/><br />
					<TextValidator name='lastName'
						ref='lastName'
						hintText="Last Name"
						validators={['required', `matchRegexp:${nameRegex}`]}
						errorMessages={['this field is required','invalid name']}
						floatingLabelText="Last Name"
						onChange={event => this.handleChange(event)}
						value={this.state.lastName}
						/><br />
					<TextValidator name='username'
						ref='username'
						hintText="Username"
						validators={['required', `matchRegexp:${usernameRegex}`]}
						errorMessages={['this field is required','invalid username']}
						floatingLabelText="Username"
						onChange={event => this.handleChange(event)}
						value={this.state.username}
						/><br />
					<TextValidator name='email'
						ref='email'
						hintText="Email Address"
						validators={['required', 'isEmail']}
						errorMessages={['this field is required','invalid email']}
						floatingLabelText="Email Address"
						onChange={event => this.handleChange(event)}
						value={this.state.email}
						/><br />
					<TextValidator name='password'
						ref='password'
						hintText="Password"
						validators={['required', `matchRegexp:${passwordRegex}`]}
						errorMessages={['this field is required','invalid password']}
						floatingLabelText="Password"
						type="password"
						onChange={event => this.handleChange(event)}
						value={this.state.password}
						/><br />
					<TextValidator name='confPassword'
						ref='confPassword'
						hintText="Confirm Password"
						validators={['required', `matchRegexp:${passwordRegex}`, 'matchesPassword']}
						errorMessages={['this field is required','invalid password', 'passwords do not match']}
						floatingLabelText="Confirm Password"
						type="password"
						onChange={event => this.handleChange(event)}
						value={this.state.confPassword}
						/><br />
					<h4 style={{textAlign: 'left'}}>Select account types</h4>
					<div>
						{this.state.accountErrorMsg}
						<Checkbox name="checkingChecked"
							label="Checking"
							checked={this.state.checkingChecked}
							onCheck={this.updateCheckChecking}
							style={styles.checkbox}
							/>
						<Checkbox name="savingsChecked"
							label="Savings"
							checked={this.state.savingsChecked}
							onCheck={this.updateCheckSavings}
							style={styles.checkbox}
							/>
					</div>
					<br />
					<RaisedButton label="Submit"
						type='submit' 
						primary={true} 
						/>
				</div>
			</ValidatorForm>
		);
	}
}
