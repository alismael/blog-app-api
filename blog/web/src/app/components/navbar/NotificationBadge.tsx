import * as React from "react"
import { Badge, Icon } from 'antd'

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

			<a href="#">
				<Badge count={this.props.notificationCount}>
					<Icon type="notification" style={{ fontSize: 25, color: '#08c' }} />
				</Badge>
			</a>

		);
	}

}

export default NotificationBadge;