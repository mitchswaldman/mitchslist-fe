import React from 'react'
import { Link } from 'react-router-dom'

const PostList = ({posts}) => (
	<ul>
		{posts.map(post => (
			<li key={post.id}>
				<Link to={`/post/${post.id}`}>{post.title}</Link>
			</li>
		))}
	</ul>
)

export default PostList