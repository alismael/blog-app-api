import * as React from "react"
import { connect } from "react-redux"
import { IUser } from "../../../Service/models"
import { Store } from '../../../Service/models'
import NotificationBadge from './NotificationBadge'
import AccountMenu from './AccountMenu'
import NavMenu from './NavMenu' 
import SearchBox from './SearchBox'
import VerticalDivider from './VerticalDivider'

import { Layout } from 'antd';
import { Row, Col } from "antd/lib/grid";
import { CSSProperties } from "react";
const { Header } = Layout;

const styles = {
	header: {
		background: 'white',
		borderBottom: '1px solid #e8e8e8',
		height: 'fit-content'
	} as  CSSProperties,
	logo: {
		fontSize: 25,
		fontFamily: 'monospace',
		fontStyle: 'italic',
		fontWeight: 900
	} as  CSSProperties
}

export interface IAppNavProps {
	user: IUser
}

function select(state: Store): IAppNavProps {
	return {
		user: state.user.user
	};
}

class Navbar extends React.Component<IAppNavProps> {
	/**
	 * Class constructor.
	 */
	constructor(props: IAppNavProps) {
		super(props);
	}

	// Render the component.
	render() {
		const { user } = this.props;

		return (
			<Header style={styles.header}>
				<Row type="flex" justify="center" align="middle">
					<Col span={2}>
						<div style={styles.logo}>
							Blogger
						</div>
					</Col>
					<Col span={8}>
						<SearchBox />
					</Col>
					<Col span={5} offset={5}>
						<NavMenu />
					</Col>
					<Col span={1}>
						<Row type="flex" justify="center">
							<VerticalDivider />								
						</Row>
					</Col>
					<Col span={1}>
						<Row type="flex" justify="start">
							<NotificationBadge notificationCount={5}/>
						</Row>
					</Col>
					<Col span={2}>
						<AccountMenu user={user}/>
					</Col>
				</Row>
			</Header>
		);
	}

}

export default connect(select)(Navbar);