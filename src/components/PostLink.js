import React from 'react'
import { Link } from 'react-router-dom'
import ToggleFavoriteButton from '../utils/ToggleFavoriteButton'
import moment from 'moment'

export default ({post}) => (
	<li key={post.id} className="result-row">
		<p className="result-info">
			<ToggleFavoriteButton postId={post.id}/>
			<time className="result-date">{moment(post.create_date).format('MMM D')}</time>
			<Link to={`/post/${post.id}`} className="result-title">{post.title}</Link>
			{post.attributes.map(attribute => {
				const key = Object.keys(attribute.data)[0]
				return <span key={`${key}_${attribute.data[key]}`} className={`attribute ${key}`}> {attribute.data[key]} </span>
			})}
			{post.photos && post.photos.length > 0 && <span className="has-pic"> pic </span>}
		</p>
	</li>
)