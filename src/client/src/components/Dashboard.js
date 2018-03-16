import React, { Component } from 'react';
import request from 'superagent';

const getAccountUrl = 'http://localhost:3001/accounts';

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user : this.props.account
		,	accounts : []
		}
	}

	componentDidMount() {
		const payload = {_uid: this.state.user._id}
		request.get(`${getAccountUrl}/${this.state.user._id}/balance`)
		.set('Content-Type', 'application/json')
		.send(payload)
		.withCredentials()
		.end((err, res) => {
			if(err) {
				console.log(err);
			} else {
				const tempAccountArray = [];

				res.body.forEach(account => {
					tempAccountArray.push(account);
				});
				this.setState({accounts : tempAccountArray});
			}
		});
	}

	render() {
		return (
			<div>
				<h1 id={'header'}>-- User Dashboard --</h1>
				<h1>My Accounts</h1>
				<div style={{textAlign : 'left'}}>
					{this.state.accounts.map(account => {
							return(
								<div>
									<h3>{account['type']}</h3>
									<p>Balance: {account['amount']}</p>
								</div>
							)
						})
					}
				</div>
			</div>
		);
	}
}
