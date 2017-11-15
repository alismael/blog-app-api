import React from "react"
import { connect } from "react-redux"
import Dashboard from "../components/Dashboard"
import { fetchBlogs } from "../actions/blogActions"

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

    return (
      <Dashboard 
        blogs={blogs} 
      />
    );
  }
}
