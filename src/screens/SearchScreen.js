import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { search } from '../actions'
import { getSearchResultsForQuery } from '../reducers'
import SearchBoxContainer from '../containers/SearchBoxContainer'
import SearchSidebarContainer from '../containers/SearchSidebarContainer'
import PostList from '../components/PostList'
import Header from '../components/Header'
import Paginator from '../components/Paginator'
import qs from 'qs'
import './SearchScreen.css'

class SearchScreen extends React.Component {
	state = { showSidebar: true }
	checkForCategory = (location, history) => {
		const { search } = location
		const query = qs.parse(search, {ignoreQueryPrefix: true}) || {}
		if (!query.cat || String(query.cat).length !== 3) {
			history.replace(`/search?${qs.stringify({...query, cat: 'sss'})}`)
		}
		return query
	}
	
	handleClick = () => {
		this.setState({showSidebar: !this.state.showSidebar})
	}


	componentDidMount() {
		const { location, history, search } = this.props
		const query = this.checkForCategory(location, history)
		search(query)
	}

	componentWillReceiveProps({location: nextLocation, history}) {
		const { location : { search } } = this.props
		const query = this.checkForCategory(nextLocation, history)
		if ( nextLocation.search !== search) {
			this.props.search(query)
		}
	}

	render() {
		const { searchResults = {}, location: { search } } = this.props
		const { showSidebar } = this.state
		const { posts = [], category_counts = {}, next, previous, total = 0 } = searchResults
		const query = qs.parse(search, { ignoreQueryPrefix: true }) || {}
		return (
			<div id="search-screen-wrapper">
				<Header/>
				<div id="search-content" className={`${showSidebar ? '' : 'collapsed'}`}>
					<h4></h4>
					<div className="querybox">
						<SearchBoxContainer onClick={this.handleClick} collapsed={!showSidebar}/>
						<div className="options-reveal">
							<button className="reveal-button" onClick={this.handleClick}> {showSidebar ? 'options' : 'close'} </button>
						</div>
					</div>
					<div className="search-legend">
						<Paginator total={total} count={posts.length} next={next} previous={previous} offset={Number(query.offset) || 0}/>
					</div>
					<PostList posts={posts} categoryId={query.cat}/>
				</div>
				<div id="search-sidebar" className={`search-options-container ${showSidebar ? '' : 'collapsed'}`}>
					<SearchSidebarContainer categoryCounts={category_counts} categoryId={query.cat || 'sss'}/>
				</div>
			</div>
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