import * as React from 'react'
import * as PropTypes from 'prop-types'
import { BlogCard } from './BlogCard'
import { GridList } from 'material-ui/GridList';
import { Blog } from "../../Service/models"

const styles = {
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
	},
	gridList: {
		width: 500,
		height: 450,
		overflowY: 'auto',
	},
};

export const Dashboard = (
    blogs: Blog[]
) => (
		<GridList
			// cellHeight={180}
			// style={styles.gridList}
		>
			{/* View blogs  */}
			{
				blogs.map((blog: Blog) => (
					<BlogCard key={blog.guid} blog={blog} />
				))
			}
		</GridList>
	);

Dashboard.propTypes = {
	blogs: PropTypes.array.isRequired
};