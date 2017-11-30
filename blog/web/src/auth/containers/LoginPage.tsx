import React from 'react';
import LoginForm from '../components/LoginForm.jsx';
import { login } from '../actions/authActions';
import { connect } from "react-redux"
// import { browserHistory } from 'react-router';
import createHistory from "history/createBrowserHistory"

@connect((store) => {
	return {
		user: store.user.user,
		error: store.user.error
	};
})
class LoginPage extends React.Component {
	browserHistory = createHistory()
	/**
	 * Class constructor.
	 */
	constructor(props) {
		super(props);

		// set the initial component state
		this.state = {
			formErrors: {},
			loginForm: {
				username: '',
				password: ''
			}
		};

		this.login = this.login.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	validForm(username, password) {
		var errors = {};

		if (username.trim() == '') {
			errors['username'] = 'required';
		}
		if (password.trim() == '') {
			errors['password'] = 'required';
		}

		return errors;
	}

	/**
	 * Process the form.
	 *
	 * @param {object} event - the JavaScript event object
	 */
	login(event) {
		// prevent default action. in this case, action is the form submission event
		event.preventDefault();

		var username = this.state.loginForm.username;
		var password = this.state.loginForm.password;

		//validate form data
		var errors = this.validForm(username, password);

		// if form valid try login
		if (Object.keys(errors).length == 0) {
			// Empty form errors
			this.setState(prevState => ({
				...prevState,
				formErrors: {}
			}))

			// dispatch login action
			this.props.dispatch(login(username, password));
		} else {
			this.setState(prevState => ({
				...prevState,
				formErrors: {
					username: errors.username,
					password: errors.password
				}
			}))
		}

	}

	// Handle changes in login form inputs
	onChange(event) {
		const field = event.target.name;
		const loginForm = this.state.loginForm;
		loginForm[field] = event.target.value;

		this.setState(prevState => ({
			...prevState,
			loginForm: loginForm
		}))
	}

	/**
	 * Render the component.
	 */
	render() {
		const { user, error } = this.props;

		// if already user logged in redirect to dashboard
		if (user) {
			this.browserHistory.push('/dashboard');
		}

		var errors = {
			'summary': error,
			'username': this.state.formErrors.username,
			'password': this.state.formErrors.password
		};

		return (
			<LoginForm
				onSubmit={this.login}
				onChange={this.onChange}
				errors={errors}
				user={this.state.loginForm}
			/>
		);
	}

}

export default LoginPage;