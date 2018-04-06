import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getPost } from '../actions'
import Header from '../components/Header'

class PostDetailScreen extends React.Component {	
	componentDidMount() {
		const { match: { params: { id } }, getPost} = this.props
		getPost(id)
	}

	render() {
		const { post } = this.props 
		if (!post || !post.id) {
			return <div> Loading post </div>
		}
		return (
			<div>
				<Header/>
				<h1> {post.title} </h1>
				{post.photos.map(img => (
					<img key={img.image} src={img.image}/>
				))}
				<p> {post.detail} </p>
				{post.attributes.map(attribute => {
					const key = Object.keys(attribute.data)[0]
					return (
						<div key={`attribute_${post.id}_${key}`}>
							<label>key</label>
							<p>{attribute.data[key]}</p>
						</div>
					)
				})}
			</div>
		)
	}
}

const mapStateToProps = (state, { match: { params: { id }}}) => ({
	post: state.entities.posts[id]
})

const mapDispatchToProps = (dispatch) => ({
	getPost: (id) => dispatch(getPost(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailScreen)