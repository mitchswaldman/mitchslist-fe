import React from 'react'
import ImageGallery from './ImageGallery'
import './PostDetail.css'

const PostDetail = ({post = {}}) => {
	const {
		title,
		detail,
		photos = [],
		attributes = [],
		category,
		create_date	
	} = post
	return (
		<div className="post-container">
			<h2></h2>
			<section className="post-meta-container">
				<button className="reply-button"> <a href="mailto:mitchswaldman@gmail.com?Subject=You%27re%20hired." target="_top"> Reply </a></button>
			</section>
			<h2 className="posting-title"> 
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
					return <span key={key} className={`attribute ${attribute.data[key]}`}>{attribute.data[key]}</span>
				})}
			</section>
		</div>
	)
}

export default PostDetail