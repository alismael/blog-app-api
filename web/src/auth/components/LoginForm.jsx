import React, { PropTypes } from 'react';
import { Card, CardText, RaisedButton, TextField } from 'material-ui';


const LoginForm = ({
    onSubmit,
    onChange,
    errors,
    user
}) => (
    <Card className="login-container">
        <h2 className="card-heading">Login</h2>

        <p className="error-message">{errors.summary}</p>

        <div className="field-line">
            <TextField
                floatingLabelText="Username"
                name="username"
                errorText={errors.username}
                onChange={onChange}
                value={user.username}
            />
        </div>

        <div className="field-line">
            <TextField
                floatingLabelText="Password"
                type="password"
                name="password"
                onChange={onChange}
                errorText={errors.password}
                value={user.password}
            />
        </div>

        <div className="button-line">
            <RaisedButton type="submit" label="Log in" onClick={onSubmit} primary />
        </div>
    </Card>
        
    );

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default LoginForm;