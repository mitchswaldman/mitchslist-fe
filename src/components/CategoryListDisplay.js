import React from 'react'
import { Link } from 'react-router-dom'
import qs from 'qs'

const CategoryListDisplay = ({ categories }) => {
	
	const renderCategoryList = (categories) => {
		return categories.map(({name, short_name, children}) => (
			<li key={short_name}>
				<Link to={`/search?${qs.stringify({cat: short_name})}`}> {name} </Link>
				{children.length > 0 && (<ul> {renderCategoryList(children)} </ul>)
				}
			</li>
		))
	}

	const renderCategoryBlock = ({name, short_name, children}) => {
		return (
			<div key={short_name} className="category-block">
				<h1 className="category-header">
					<Link to={`/search?${qs.stringify({cat: short_name})}`}>{name}</Link> 
				</h1>
				<ul> 
					{renderCategoryList(children)}
				</ul>
			</div>
		)
	}
	return (
		<div className="categories-container">
			{categories.map(category => renderCategoryBlock(category))}
		</div>
	)
}

export default CategoryListDisplay