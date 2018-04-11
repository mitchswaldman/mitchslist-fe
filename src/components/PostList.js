import React from 'react'
import { Link } from 'react-router-dom'
import PostLink from './PostLink'
import './PostList.css'

export default class PostList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			module: null
		}
	}

	render() {
		const { posts, categoryId, favorites, handleFavoriteClick} = this.props

		return (
			<ul className="row">
				{posts.map(post => (
					<PostLink post={post}/>
				))}
			</ul>
		)
	}
}
