import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const appBarButtonStyle = {
  margin: 12,
};

export default class LogInMenuButtons extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn : this.props.loggedIn
		}
  }
  
  render() {
		return (
      <div>
        <RaisedButton label="Login"
          onClick={this.props.loginClick} 
          primary={true} style={appBarButtonStyle} 
        />
        <RaisedButton label="Register"
          onClick={this.props.registerClick}
          secondary={true} style={appBarButtonStyle}
        />
      </div>
		);
  }
}
