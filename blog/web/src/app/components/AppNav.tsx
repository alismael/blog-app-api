import * as React from "react"
import { connect } from "react-redux"
import { IUser } from "../../Service/models"
import { Store } from '../../Service/models'
import { AppBar } from 'material-ui'
import NotificationBadge from '../../app/components/NotificationBadge'
import AccountMenu from '../../app/components/AccountMenu'
import VerticalDivider from '../../app/components/VerticalDivider'

const styles = {
  nav: {
		backgroundColor: '#fff',
		marginBottom: '10px'
	} as React.CSSProperties,
	titleStyle: {
		color: '#4a89dc'
	} as React.CSSProperties,
	divider: {
		borderTopWidth: 0,
		borderRightWidth: 3,
		borderRightStyle: 'solid',
		height: 45,
		top: 0,
    bottom: 0,
    margin: 'auto',
		borderRightColor: '#e1e1e1'
	}
};

export interface IAppNavProps {
	user: IUser
}

function select(state: Store): IAppNavProps {
	return {
		user: state.user.user
	};
}

class AppNav extends React.Component<IAppNavProps> {
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
			<AppBar 
				title="Blog App"
				iconElementLeft={<div> </div>}
				style={styles.nav}
				titleStyle={styles.titleStyle}
				>

					<NotificationBadge notificationCount={5} /> 
					<VerticalDivider />
					<AccountMenu user={user} />

			</AppBar>
		);
	}

}

export default connect(select)(AppNav);