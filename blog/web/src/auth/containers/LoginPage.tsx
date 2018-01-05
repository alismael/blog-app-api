import * as React from "react"
import { connect } from "react-redux"
import { IUser } from "../../Service/models"
import { Store } from '../../Service/models'
import store from "../../store"
import { login } from '../actions/authActions'
import LoginForm from '../components/LoginForm'
import { Row, Col } from "antd/lib/grid";

export interface ILoginFormErrors {
	username: string,
	password: string,
	summary: string
}

export interface ILoginForm {
	[key: string]: any,
	username: string,
	password: string,
	isValid: boolean,
	errors: ILoginFormErrors
}

export interface ILoginState {
	loginForm: ILoginForm
}

export interface ILoginProps {
	user: IUser,
	error: string,
	history?: any
}

const initialForm: ILoginForm = {
	username: '',
	password: '',
	isValid: false,
	errors: {
		username: '',
		password: '',
		summary: ''
	}
}

const initialState: ILoginState = {
	loginForm: initialForm
}

function select(state: Store): ILoginProps {
	return {
		user: state.user.user,
		error: state.user.error
	};
}

class LoginPage extends React.Component<ILoginProps, ILoginState> {
	/**
	 * Class constructor.
	 */
	constructor(props: ILoginProps) {
		super(props);

		this.state = initialState

		this.login = this.login.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		const { user, history } = this.props;
		
		// if already user logged in redirect to dashboard
		if (!user.isGuest) {
			history.push('/dashboard')
		}
	}

	componentDidUpdate() {
		const { user, history } = this.props;
		
		// if already user logged in redirect to dashboard
		if (!user.isGuest) {
			history.push('/dashboard')
		}
	}

	// Form validation
	validForm() {
		let isValid: boolean = true
		let errors: ILoginFormErrors = {
			username: '',
			password: '',
			summary: ''
		}

		// validate username
		if (this.state.loginForm.username.trim() == '') {
			errors.username = 'This field is required'
			isValid = false
		}

		// validate password
		if (this.state.loginForm.password.trim() == '') {
			errors.password = 'This field is required'
			isValid = false
		}

		// Update state
		this.setState({
			...this.state,
			loginForm: {
				...this.state.loginForm,
				errors: errors,
				isValid: isValid
			}
		})

		return isValid
	}

	// Handle login form submittion
	login(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		// if form valid try login
		if (this.validForm()) {
			// dispatch login action
			var username = this.state.loginForm.username;
			var password = this.state.loginForm.password;
			store.dispatch(login(username, password));
		}
	}

	// Handle changes in login form inputs
	onChange(e: React.FormEvent<HTMLInputElement>) {
		const field = e.currentTarget.name;
		const loginForm: ILoginForm = this.state.loginForm;
		loginForm[field] = e.currentTarget.value;


		// Update state
		this.setState({
			...this.state,
			loginForm: loginForm
		})
	}

	// Render the component.
	render() {
		const { user } = this.props;

		return (
			<Row>
				<h1>Hi {user.username}</h1>

				<Col offset={10} span={4}>
					<LoginForm
						onSubmit={this.login}
						onChange={this.onChange}
						form={this.state.loginForm}
						errorSummary={this.props.error}
					/>
				</Col>
			</Row>
		);
	}

}

export default connect(select)(LoginPage);