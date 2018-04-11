import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPost } from '../actions'
import Header from '../components/Header'
import PostLink from '../components/PostLink'

class FavoritesScreen extends React.Component {
	componentDidMount() {
		Object.keys(this.props.favorites).map(id => {
			return this.props.getPost(id)
		})
	}

	render() {
		const { allPosts, favorites } = this.props
		const favIds = Object.keys(favorites)
		return (
			<div>
				<Header />
				<div className="home-wrapper">
					<ul className="row">
						{favIds.map(id => {
							if (allPosts.hasOwnProperty(id)) {
								const post = allPosts[id]
								return <PostLink key={id} post={post}/>
							}
							return <li key={id}> Loading post.. </li>
						})}
					</ul>
				</div>
			</div>
		)
	}
}

const mapStateToPRops = (state) => ({
	favorites: state.favorites,
	allPosts: state.entities.posts
})

const mapDispatchToProps = (dispatch) => ({
	getPost: (id) => dispatch(getPost(id))
})

export default connect(mapStateToPRops, mapDispatchToProps)(FavoritesScreen)