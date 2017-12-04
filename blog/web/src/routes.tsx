import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './app/components/Home'
import LoginPage from './auth/containers/LoginPage'
import DashboardPage from './dashboard/containers/DashboardPage'

export const RouteMap = () => (
	<div>
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/login" component={LoginPage} />
			<Route path="/dashboard" component={DashboardPage} />
			<Route component={Home} />
		</Switch>
	</div>
);