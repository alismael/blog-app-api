import * as React from "react"
import { connect } from "react-redux"
import { fetchBlogs } from "../actions/blogActions"
import { Blog } from "../../Service/models"
import  Dashboard from '../components/Dashboard'
import { Store } from '../../Service/models' 
import store from "../../store"

export interface IDashboardProps { 
  blogs: Blog[]
}

function select(state: Store): IDashboardProps {
  return {
    blogs: state.blogs.blogs,
  };
}

class DashboardPage extends React.Component<IDashboardProps, {}> {
  componentWillMount() {
    store.dispatch(fetchBlogs())
  }

  render() {
    const { blogs } = this.props;

    return (
      <Dashboard blogs={blogs} />
    )
  }
}

export default connect(select)(DashboardPage);