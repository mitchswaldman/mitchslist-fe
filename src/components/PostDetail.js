import React from 'react'
import ImageGallery from './ImageGallery'
import ToggleFavoriteButton from '../utils/ToggleFavoriteButton'
import './PostDetail.css'

const PostDetail = ({post = {}}) => {
	const {
		title,
		detail,
		photos = [],
		attributes = [],
		category,
		create_date,
		id	
	} = post
	return (
		<div className="post-container">
			<h2></h2>
			<section className="post-meta-container">
				<button className="reply-button"> <a href="mailto:mitchswaldman@gmail.com?Subject=You%27re%20hired." target="_top"> Reply </a></button>
			</section>
			<h2 className="posting-title"> 
				<ToggleFavoriteButton postId={id}/>&nbsp;
				{title} 
				{attributes.map(attribute => {
					const key = Object.keys(attribute.data)[0]
					return <span key={key} className={`attribute ${attribute.data[key]}`}>{attribute.data[key]}</span>
				})}
			</h2>
			<ImageGallery photos={photos}/>
			<section className="post-body">
				{detail}
			</section>
			<section className="post-attributes">
				{attributes.map(attribute => {
					const key = Object.keys(attribute.data)[0]
					console.log(key);
					return (<span key={key} className={`attr-group ${key}`}>
								<span className="attribute key">{key}&nbsp;</span>
								<span className="attribute value">{attribute.data[key]}</span>
							</span>)
				})}
			</section>
		</div>
	)
}

export default PostDetail