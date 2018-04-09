import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import './PostList.css'

export default class PostList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			module: null
		}
	}

	render() {
		const { posts, categoryId} = this.props

		return (
			<ul class="row">
				{posts.map(post => (
					<li key={post.id} className="result-row">
						<p className="result-info">
							<time class="result-date">{moment(post.create_date).format('MMM D')}</time>
							<Link to={`/post/${post.id}`} className="result-title">{post.title}</Link>
							{post.attributes.map(attribute => {
								const key = Object.keys(attribute.data)[0]
								return <span className={`attribute ${key}`}> {attribute.data[key]} </span>
							})}
						</p>
					</li>
				))}
			</ul>
		)
	}
}
