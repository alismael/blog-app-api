import * as React from 'react'
import { BlogCard } from './BlogCard'
import { Blog } from "../../Service/models"
import { IDashboardProps } from '../containers/DashboardPage'
import Navbar from '../../app/components/navbar/Navbar'
import { Row, Col } from 'antd/lib/grid';

const Dashboard = (props: IDashboardProps) => {
	let blogs = props.blogs

	return (
		<div>
			<Navbar />

			<Row gutter={16} style={{marginTop: 10, maxWidth: '100%'}}>
				{
					blogs.map((blog: Blog) => (
						<Col span={6}>
							<BlogCard key={blog.guid} blog={blog} />
						</Col>
					))
				}
			</Row>
		</div>
	)
}

export default Dashboard