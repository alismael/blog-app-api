import React from 'react'
import Dashboard from '../components/Dashboard'


class DashboardPage extends React.Component {

    /**
     * Class constructor.
     */
    constructor(props) {
        super(props);

        // set the initial component state
        this.state = { blogs: [] };
    }

    componentDidMount() {
      this.getBlogs();
    }

    getBlogs(){
      return $.getJSON('http://localhost:3000/api/blog')
      .then((data) => {
        if ( !data.error )
          this.setState({ blogs: data });
      });
    }

    /**
     * Render the component.
     */
    render() {
        return (
            <Dashboard
                blogs={this.state.blogs}
            />
        );
    }

}

export default DashboardPage;