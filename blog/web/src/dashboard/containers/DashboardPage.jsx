import React from "react"
import { connect } from "react-redux"

import { fetchBlogs } from "../../actions/blogActions"

@connect((store) => {
  return {
    blogs: store.blogs.blogs,
  };
})
export default class DashboardPage extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchBlogs())
  }

  render() {
    const { blogs } = this.props;

    const mappedBlogs = blogs.map(blog => <li key={blog.id}>{blog.data.title}</li>)

    return <div>
      {<ul>{mappedBlogs}</ul>}
    </div>
  }
}
