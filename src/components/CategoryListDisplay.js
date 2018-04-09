import React from 'react'
import { Link } from 'react-router-dom'
import qs from 'qs'
import './CategoryListDisplay.css'

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

	const renderCategoryBlock = ({name, short_name, children}, index) => {
		return (
			<div key={short_name} className='category-block'>
				<h4 className="ban">
					<Link to={`/search?${qs.stringify({cat: short_name})}`}>{name}</Link> 
				</h4>
				<ul> 
					{renderCategoryList(children)}
				</ul>
			</div>
		)
	}
	return (
		<div className="categories-container">
			{categories.map((category, index) => renderCategoryBlock(category, index))}
		</div>
	)
}

export default CategoryListDisplay