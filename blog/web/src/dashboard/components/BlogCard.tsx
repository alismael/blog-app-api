import * as React from "react"
import {GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import { Blog } from "../../Service/models"

export interface BlogCardProps { 
  blog: Blog
}

export class BlogCard extends React.Component<BlogCardProps, {}> {
  render() {
    return (
      <GridTile
          key={this.props.blog.img}
          title={this.props.blog.data.title}
          subtitle={<span>by <b>{this.props.blog.trace.createdBy}</b></span>}
          actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
      >
        <img src={this.props.blog.img} />
      </GridTile>
    );
  }
}