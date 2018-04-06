import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { search } from '../actions'
import { getSearchResultsForQuery } from '../reducers'
import SearchBoxContainer from '../containers/SearchBoxContainer'
import PostList from '../components/PostList'
import Header from '../components/Header'
import qs from 'qs'

class SearchScreen extends React.Component {
	checkForCategory = (location, history) => {
		const { search } = location
		const query = qs.parse(search, {ignoreQueryPrefix: true}) || {}
		if (!query.cat || String(query.cat).length !== 3) {
			history.push(`/search?${qs.stringify({...query, cat: 'sss'})}`)
		}
		return query
	}
	
	componentDidMount() {
		const { location, history, search } = this.props
		const query = this.checkForCategory(location, history)
		search(query)
	}

	componentWillReceiveProps({location: nextLocation, history}) {
		const { location : { search } } = this.props
		const query = this.checkForCategory(nextLocation, history)
		if ( query != qs.parse(search, {ignoreQueryPrefix: true}) ) {
			this.props.search(query)
		}
	}

	render() {
		const { searchResults = {}, location: { search } } = this.props
		const { posts = [], category_counts = {}, next, previous, count } = searchResults
		const query = qs.parse(search, { ignoreQueryPrefix: true }) || {}
		return (
			<React.Fragment>
				<Header/>
				<div> Search Screen </div>
				<SearchBoxContainer/>
				<PostList posts={posts}/>
				<SearchSidebarContainer categoryCounts={category_counts} cat={query.cat || 'sss'}/>
			</React.Fragment>
		)
	}
}
	
const mapStateToProps = (state, { location: { search }}) => {
	const query = qs.parse(search, { ignoreQueryPrefix: true })
	return {
		searchResults: getSearchResultsForQuery(state, query)
	}
}

const mapDispatchToProps = (dispatch) => ({
	search: (query) => dispatch(search(query))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchScreen))