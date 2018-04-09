import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, change } from 'redux-form'
import { withRouter } from 'react-router-dom'
import FacetedLink from '../utils/FacetedLink'
import CheckboxGroup from '../utils/CheckboxGroup'
import { categoryFilterFormName } from '../constants'
import keys from 'lodash/keys'
import pickBy from 'lodash/pickBy'
import qs from 'qs'
import './CategoryFacets.css'

class CategoryFacets extends React.Component {
	render() {
		const { categoryCounts, currentCategoryId } = this.props 
		const filteredCategoryCounts = pickBy(categoryCounts, (value, key) => {
			return key !== currentCategoryId
		})
		return (
			<form className="category-facet-form">
				<CheckboxGroup name="ex_cats" 
					invert 
					options={keys(filteredCategoryCounts).map(key=>filteredCategoryCounts[key])
						.map(({category, count}) => ({
							value: category.short_name, 
							label: <div className="category-facet-link">
									<FacetedLink to='/search' query={{cat: category.short_name}}>
										{category.name}
										<span className="count"> {count} </span>
									</FacetedLink>
								</div>}))}/>
			</form>
		)
	}
}

CategoryFacets.propTypes = {
	categoryCounts: PropTypes.object.isRequired,
	currentCategoryId: PropTypes.string.isRequired
}

const mapStateToProps = (state, { location: { search }}) => {
	const query = qs.parse(search, { ignoreQueryPrefix: true })
	if (query.ex_cats && !Array.isArray(query.ex_cats)) {
		query.ex_cats = [query.ex_cats]
	}
	return {
		initialValues: {
			ex_cats: query.ex_cats
		}
	}
}

const onChange = (values, dispatch, props) => {
	dispatch(change(categoryFilterFormName, 'ex_cats', values['ex_cats']))
}

export default withRouter(connect(mapStateToProps)(reduxForm({
	form: 'categoryFacetForm',
	enableReinitialize: true,
	onChange
})(CategoryFacets)))