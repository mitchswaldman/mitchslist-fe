import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCategory, getCategories } from '../actions'
import { getCategoryFromState } from '../reducers'
import CategoryFacets from '../components/CategoryFacets'
import CategoryFilterForm from './CategoryFilterForm'

class SearchSidebarContainer extends React.Component {
	componentDidMount() {
		this.props.getCategory(this.props.categoryId)
		this.props.getCategories()
	}

	componentWillReceiveProps({categoryId: nextCatId}) {
		if (nextCatId !== this.props.categoryId) {
			this.props.getCategory(nextCatId)
		}
	}

	render() {
		const { category = {}, categoryCounts, categories } = this.props
		if (!category.attributes) {
			return <div> Loading category... </div>
		}
		return (
			<div>
				<h2> {category.name} </h2>
				<CategoryFacets categoryCounts={categoryCounts}/>
				<CategoryFilterForm attributes={category.attributes}/>
			</div>
		)
	}
}

SearchSidebarContainer.propTypes = {
	categoryId: PropTypes.number.isRequired,
	categoryCounts: PropTypes.object.isRequired
}

const mapStateToProps = (state, { categoryId }) => ({
	category: getCategoryFromState(state, categoryId),
	categories: state.entities.categories
})

const mapDispatchToProps = (dispatch, { category }) => ({
	getCategory: (catId) => dispatch(getCategory(catId)),
	getCategories: () => dispatch(getCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchSidebarContainer)