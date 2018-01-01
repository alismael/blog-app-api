import * as React from "react"
import { Menu, Icon } from 'antd'
import { CSSProperties } from "react";

const styles = {
	menu: {
		borderBottom: '0px',
		lineHeight: '61px',
		float: 'right'
	} as  CSSProperties
}

export interface INavMenuProps {

}

class NavMenu extends React.Component<INavMenuProps> {

	// Render the component.
	render() {

		return (
			<Menu
				mode="horizontal"
				theme="light" 
				style={styles.menu}
			>
				<Menu.Item key="home">
					<Icon type="home" />Home
				</Menu.Item>

				<Menu.Item key="explore">
					<Icon type="compass" />Explore
				</Menu.Item>

				<Menu.Item key="about">
					<Icon type="info-circle-o" />About
				</Menu.Item>
			</Menu>

		);
	}

}

export default NavMenu;