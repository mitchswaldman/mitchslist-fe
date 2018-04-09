import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FacetedLink from '../utils/FacetedLink'
import { getCategory, getCategories } from '../actions'
import { getCategoryFromState } from '../reducers'
import CategoryFacets from './CategoryFacets'
import CategoryFilterForm from './CategoryFilterForm'
import './SearchSidebarContainer.css'

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
		const { category = {}, categoryCounts, categories, categoryId } = this.props
		if (!category.attributes) {
			return <div> Loading category... </div>
		}
		return (
			<div className="search-options">
				<div className="searchgroup categories"> 
					<div className="cattitle">
						<FacetedLink query={{cat: categoryId}}> {category.name}  </FacetedLink>
					</div>
					<CategoryFacets categoryCounts={categoryCounts} currentCategoryId={categoryId}/>
				</div>
				<CategoryFilterForm attributes={category.attributes}/>
			</div>
		)
	}
}

SearchSidebarContainer.propTypes = {
	categoryId: PropTypes.string.isRequired,
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