import * as React from "react"
import { connect } from "react-redux"
import { fetchBlogs } from "../actions/blogActions"
import { Blog } from "../../Service/models"
import { BlogCard } from '../components/BlogCard'
import { GridList } from 'material-ui/GridList'
import { Store } from '../../Service/models' 
import store from "../../store"

export interface DashboardProps { 
  blogs: Blog[]
}

function select(state: Store): DashboardProps {
  return {
    blogs: state.blogs.blogs,
  };
}

class DashboardPage extends React.Component<DashboardProps, {}> {
  componentWillMount() {
    store.dispatch(fetchBlogs())
  }

  render() {
    const { blogs } = this.props;

    return (
      <GridList>
			{/* View blogs  */}
			{
				blogs.map((blog: Blog) => (
					<BlogCard key={blog.guid} blog={blog} />
				))
			}
		</GridList>
    );
  }
}

export default connect(select)(DashboardPage);