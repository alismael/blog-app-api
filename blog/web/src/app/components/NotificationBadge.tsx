import * as React from "react"
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

const styles = {
	badge: {
		padding: '8px 8px 8px 8px',
		marginRight: 10
	} as React.CSSProperties,
	notificationBadge: {
		top: 5, 
		right: 5 
	} as React.CSSProperties
};

export interface INotificationBadgeProps {
	notificationCount: number
}

class NotificationBadge extends React.Component<INotificationBadgeProps> {
	/**
	 * Class constructor.
	 */
	constructor(props: INotificationBadgeProps) {
		super(props);
	}

	// Render the component.
	render() {

		return (

			<div>
				<Badge
					badgeContent={this.props.notificationCount}
					primary={true}
					style={styles.badge}
					badgeStyle={styles.notificationBadge}
				>
					<IconButton tooltip="Notifications">
						<NotificationsIcon />
					</IconButton>
				</Badge>
			</div>

		);
	}

}

export default NotificationBadge;