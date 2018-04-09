import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import merge from 'lodash/merge'
import qs from 'qs'

const FacetedLink = ({query, currentSearchQuery = {}, children, ...rest}) => {
	const currentQuery = merge({}, currentSearchQuery)
	// Jumping from one search to another shouldn't include current page data. 
	// It should just include the relative query params from this category
	delete currentQuery.limit
	delete currentQuery.offset
	const link = qs.stringify(merge({}, currentQuery, query))
	return (
		<Link {...rest} to={`/search?${link}`}>
			{children}
		</Link>
	)
}

FacetedLink.propTypes = {
	query: PropTypes.object.isRequired
}

const mapStatetoProps = (state, {location: { search }}) => ({
	currentSearchQuery: qs.parse(search, { ignoreQueryPrefix: true })
})

export default withRouter(connect(mapStatetoProps, {})(FacetedLink))