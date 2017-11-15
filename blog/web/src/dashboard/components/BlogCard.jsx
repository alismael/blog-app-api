import React, { Component } from "react";
import {GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

export default class BlogCard extends Component {
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