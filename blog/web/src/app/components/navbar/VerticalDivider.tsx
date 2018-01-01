import * as React from "react"

const styles = {
	divider: {
		borderTopWidth: 0,
		borderRightWidth: 3,
		borderRightStyle: 'solid',
		height: 63,
		top: 0,
		bottom: 0,
		margin: 'auto',
		borderRightColor: '#e1e1e1'
	}
};

export interface IVerticalDividerProps {

}

class VerticalDivider extends React.Component<IVerticalDividerProps> {
	/**
	 * Class constructor.
	 */
	constructor(props: IVerticalDividerProps) {
		super(props);
	}

	// Render the component.
	render() {

		return (
			<div style={styles.divider} />
		);
	}

}

export default VerticalDivider;