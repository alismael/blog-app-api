import React, { PropTypes } from 'react'
import BlogCard from './BlogCard'
import {GridList, GridTile} from 'material-ui/GridList';

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

const Dashboard = ({
    blogs
}) => (
  <GridList
      cellHeight={180}
      style={styles.gridList}
  >
    {/* View blogs  */}
    {
      blogs.map((blog, index) => (
        <BlogCard key={blog.guid} blog={blog} />
      ))
    }
  </GridList>
);

Dashboard.propTypes = {
    blogs: PropTypes.array.isRequired
};

export default Dashboard;