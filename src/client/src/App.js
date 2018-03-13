import React, { Component } from 'react';
import './App.css';
import AppBar from 'material-ui/AppBar';
import HomePage from './components/HomePage';
import LogInForm from './components/LogInForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import RaisedButton from 'material-ui/RaisedButton';
import Card from 'material-ui/Card';

import AtmAppBar from './components/AtmAppBar';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn : false
    , user : {}
    , loginClicked : false
    , registerClicked : false
    }

    this.handleTitleClick = this.handleTitleClick.bind(this);
    this.handleLogInSuccess = this.handleLogInSuccess.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleRegisterClick = this.handleRegisterClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleTitleClick() {
    this.setState({
      loginClicked : false
    , registerClicked : false
    });
  }

  handleLogInSuccess(user) {
    this.setState({
      loggedIn : true
    , user : user
    , loginClicked : false
    , registerClicked : false
    });
  }

  handleLoginClick() {
    this.setState({
      loginClicked : true
    , registerClicked : false
    });
  }

  handleRegisterClick() {
    this.setState({
      registerClicked : true
    , loginClicked : false
    });
  }

  handleLogoutClick() {
    this.setState({
      loggedIn : false
    , user : {}
    , loginClicked : false
    , registerClicked : false
    });
  }

  render() {
    return (
      <div className="App">
        <div>
          <AtmAppBar
            loggedIn={this.state.loggedIn}
            titleClick={this.handleTitleClick}
            loginClick={this.handleLoginClick}
            registerClick={this.handleRegisterClick}
            logoutClick={this.handleLogoutClick}
          />
        </div>
        <div style={{textAlign : 'center'}}>
          <Card>
            {!this.state.loggedIn && !this.state.loginClicked && !this.state.registerClicked ?
              <HomePage /> : null
            }
            {!this.state.loggedIn && this.state.loginClicked ?
              <LogInForm action={this.handleLogInSuccess} /> : null            
            }
            {!this.state.loggedIn && this.state.registerClicked ?
              <RegisterForm /> : null            
            }
            {this.state.loggedIn ? 
              <Dashboard account={this.state.user}/> : null
            }
          </Card>
        </div>
        <div>
          
        </div>
      </div>
    );
  }
}

export default App;
