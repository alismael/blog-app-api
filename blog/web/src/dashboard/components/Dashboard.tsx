import * as React from 'react'
import { BlogCard } from './BlogCard'
import { GridList } from 'material-ui/GridList';
import { Blog } from "../../Service/models"
import { IDashboardProps } from '../containers/DashboardPage';

const styles: React.CSSProperties = {
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
	},
	gridList: {
		width: 500,
		height: 420,
		overflowY: 'auto',
	},
};

const Dashboard = (props: IDashboardProps) => {
	let blogs = props.blogs

	return (
		<GridList
			cellHeight={200}
			style={styles.gridList}
		>
			{
				blogs.map((blog: Blog) => (
					<BlogCard key={blog.guid} blog={blog} />
				))
			}
		</GridList>

	)
}

export default Dashboard