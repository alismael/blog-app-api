import * as React from "react"
import { Blog } from "../../Service/models"
import { Card, Icon, Avatar } from 'antd';
const { Meta } = Card;

export interface BlogCardProps {
  blog: Blog
}

export class BlogCard extends React.Component<BlogCardProps, {}> {
  render() {
    return (
      <Card
        key={this.props.blog.guid}
        cover={<img alt={this.props.blog.data.title} src={this.props.blog.img} />}
        actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
        style={{marginBottom: 10}}
        >
        <Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={this.props.blog.data.title}
          description={this.props.blog.data.description}
        />
      </Card>
    );
  }
}