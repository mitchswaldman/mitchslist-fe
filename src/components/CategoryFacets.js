import React from 'react'
import PropTypes from 'prop-types'
import FacetedLink from '../utils/FacetedLink'

const CategoryFacets = ({categoryCounts = {}}) => {

	return (
		<div>
			{Object.keys(categoryCounts).map(key => {
				const { category, count } = categoryCounts[key]
				return (
					<div key={category.short_name}>
						<FacetedLink query={{cat: category.short_name}}>{category.name}<span>{count}</span></FacetedLink>
					</div>
				)
			})}
		</div>
	)
}

CategoryFacets.propTypes = {
	categoryCounts: PropTypes.object.isRequired
}

export default CategoryFacets