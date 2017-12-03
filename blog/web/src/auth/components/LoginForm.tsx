import * as React from "react"
import { Card, RaisedButton, TextField } from 'material-ui';
import { ILoginForm } from "../containers/LoginPage";

interface ILoginFormProps {
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
	onChange: (e: React.FormEvent<HTMLInputElement>) => void,
	form: ILoginForm,
	errorSummary: string
}

const LoginForm = (props: ILoginFormProps) => {
	let onSubmit: (e: React.FormEvent<HTMLFormElement>) => void = props.onSubmit
	let onChange: (e: React.FormEvent<HTMLInputElement>) => void = props.onChange
	let form: ILoginForm = props.form
	let errorSummary: string = props.errorSummary

	return (
		<form onSubmit={ (e) => onSubmit(e)}>
			<Card className="login-container">
				<h2 className="card-heading">Login</h2>

				<p className="error-message">{errorSummary}</p>

				<div className="field-line">
					<TextField
						floatingLabelText="Username"
						name="username"
						errorText={form.errors.username}
						onChange={onChange}
						value={form.username}
					/>
				</div>

				<div className="field-line">
					<TextField
						floatingLabelText="Password"
						type="password"
						name="password"
						onChange={onChange}
						errorText={form.errors.password}
						value={form.password}
					/>
				</div>

				<div className="button-line">
					<RaisedButton type="submit" label="Log in" primary />
				</div>
			</Card>
		</form>

	)
}

export default LoginForm;