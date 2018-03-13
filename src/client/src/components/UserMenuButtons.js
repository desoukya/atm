import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const appBarButtonStyle = {
  margin: 12,
};

export default class UserMenuButtons extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn : this.props.loggedIn
		}
  }
  
  render() {
		return (
      <div>
        <RaisedButton label="Logout"
          onClick={this.props.logoutClick} 
          primary={true} style={appBarButtonStyle} 
        />
        <RaisedButton label="TempButton"
          // onClick={this.props.registerClick}
          secondary={true} style={appBarButtonStyle}
        />
      </div>
		);
  }
}
