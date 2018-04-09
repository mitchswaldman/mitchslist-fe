import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getPost } from '../actions'
import Header from '../components/Header'
import PostDetail from '../components/PostDetail'
import './PostDetailScreen.css'

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
				<Header />
				<PostDetail post={post}/>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetailScreen))