import React from 'react';
import LoginForm from '../components/LoginForm.jsx';
import { login } from '../actions/authActions';
import { connect } from "react-redux"

@connect((store) => {
  return {
    user: store.user.user,
  };
})
class LoginPage extends React.Component {

	/**
	 * Class constructor.
	 */
	constructor(props) {
		super(props);

		// set the initial component state
		this.state = {
			errors: {},
			user: {
				username: '',
				password: ''
			}
		};

		this.login = this.login.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	validForm(username, password) {
		var errors = {
			username: (username.trim() == "") ? "required" : "",
			password: (password.trim() == "") ? "required" : ""
		}

		if (username.trim() == "" || password.trim() == "")
			return { error: true, errors: errors };
		else
			return { error: false };
	}

	/**
	 * Process the form.
	 *
	 * @param {object} event - the JavaScript event object
	 */
	login(event) {
		// prevent default action. in this case, action is the form submission event
		event.preventDefault();

		var username = this.state.user.username;
		var password = this.state.user.password;

		//validate form data
		var result = this.validForm(username, password);

		// if form valid try login
		if (!result.error) {
			this.props.dispatch(login(username, password));
		} else {
			this.setState({
				errors: {
					username: result.errors.username,
					password: result.errors.password
				}
			});
		}

	}

	/**
 * Change the user object.
 *
 * @param {object} event - the JavaScript event object
 */
	onChange(event) {
		const field = event.target.name;
		const user = this.state.user;
		user[field] = event.target.value;

		this.setState({
			user
		});
	}

	/**
	 * Render the component.
	 */
	render() {
		return (
			<LoginForm
				onSubmit={this.login}
				onChange={this.onChange}
				errors={this.state.errors}
				user={this.state.user}
			/>
		);
	}

}

export default LoginPage;