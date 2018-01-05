import * as React from "react"
import { ILoginForm } from "../containers/LoginPage"
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { CSSProperties } from "react";
const FormItem = Form.Item;

const styles = {
	form: {
		heght: 500,
		width: '100%'
	} as CSSProperties,
	textInput: {
		height: 40
	} as CSSProperties,
	submitBtn: {
		width: '100%'
	} as CSSProperties,
	forgetPassword: {
		float: 'right'
	} as CSSProperties,
};

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
		<Form onSubmit={onSubmit} className="login-form" style={styles.form}>
			<p className="error-message">{errorSummary}</p>
			<FormItem
				validateStatus={form.errors.username ? 'error' : 'success'}
				required
				>
				<Input
					prefix={
						<Icon
							type="user"
							style={{ color: 'rgba(0,0,0,.25)' }}
							/>
						}
					placeholder="Username"
					name="username"
					onChange={onChange}
					value={form.username}
					style={styles.textInput}
					/>
			</FormItem>
			<FormItem
				validateStatus={form.errors.password ? 'error' : 'success'}
				required
				>
				<Input
					prefix={
						<Icon
							type="lock"
							style={{ color: 'rgba(0,0,0,.25)' }} 
							/>
						}
					type="password"
					placeholder="Password"
					name="password"
					onChange={onChange}
					value={form.password}
					style={styles.textInput}					
				/>
			</FormItem>
			<FormItem>
				<Checkbox>Remember me</Checkbox>
				<a 
					className="login-form-forgot" 
					href=""
					style={styles.forgetPassword}
					>
					Forgot password
				</a>
				<Button 
					type="primary" 
					htmlType="submit" 
					className="login-form-button"
					style={styles.submitBtn}
					>
					Log in
				</Button>
				Or <a href="">register now!</a>
			</FormItem>
		</Form>
	)
}

export default LoginForm;