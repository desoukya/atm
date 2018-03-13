import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import UserMenuButtons from './UserMenuButtons';
import LogInMenuButtons from './LogInMenuButtons';

const styles = {
  title: {
    cursor: 'pointer',
  }
};

export default class AtmAppBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      
    }
	}

	render() {
		return (
      <AppBar
        title={<span style={styles.title}>ATM</span>}
        showMenuIconButton={false}
        onTitleClick={this.props.titleClick}
        iconElementRight={
          <div>
            {this.props.loggedIn ? 
              <UserMenuButtons 
                logoutClick={this.props.logoutClick}
              />
            : <LogInMenuButtons
                loginClick={this.props.loginClick}
                registerClick={this.props.registerClick}
              />
            }
          </div>
        }
      />
		);
	}
}
