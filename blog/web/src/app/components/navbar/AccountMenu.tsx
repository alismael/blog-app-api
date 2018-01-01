import * as React from "react"
import { IUser } from "../../../Service/models"
import { Avatar } from 'antd'
import { CSSProperties } from "react";

const styles = {
	avatar: {
		position: 'relative',
		top: 10
	} as  CSSProperties,
	username: {
		paddingLeft: 5
	} as  CSSProperties
}

export interface IAccountMenuProps {
	user: IUser
}

class AccountMenu extends React.Component<IAccountMenuProps> {
	/**
	 * Class constructor.
	 */
	constructor(props: IAccountMenuProps) {
		super(props);
	}

	// Render the component.
	render() {

		return (
			<div>
				<Avatar 
					shape="circle" 
					icon="user" 
					src="/api/public/img/user_default.png"
					style={styles.avatar}
					/>
				<span style={styles.username}>
					{this.props.user.username}
				</span>
			</div>
		);
	}

}

export default AccountMenu;