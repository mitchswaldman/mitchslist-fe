import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { toggleFavorite } from '../actions'

const ToggleFavoriteButton = ({toggleFavorite, favorited = false}) => (
	<a onClick={() => toggleFavorite()}
		className={`favorite-button ${favorited ? 'favorited' : 'unfavorited'}`}>
		<i className='fas fa-star'></i>
	</a>
)

ToggleFavoriteButton.propTypes = {
	postId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
}

const mapStateToProps = (state, {postId}) => ({
	favorited: state.favorites.hasOwnProperty(postId)
})

const mapDispatchToProps = (dispatch, {postId}) => ({
	toggleFavorite: () => dispatch(toggleFavorite(postId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ToggleFavoriteButton)