import * as React from "react"
import { IUser } from "../../Service/models"
import { Avatar, ListItem } from 'material-ui'

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

			<ListItem
				disabled={true}
				leftAvatar={
					<Avatar src="/api/public/img/user_default.png" />
				}
			>
				{this.props.user.username}
			</ListItem>

		);
	}

}

export default AccountMenu;