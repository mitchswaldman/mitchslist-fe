import React from 'react'
import { connect } from 'react-redux'
import { getCategories } from '../actions'
import { getCategoryRelationTree } from '../reducers'
import CategoryListDisplay from '../components/CategoryListDisplay'
import Header from '../components/Header'

class HomeScreen extends React.Component {
	componentDidMount() {
		this.props.loadCategories()
	}

	render() {
		const { categories = [] } = this.props
		if (categories.length == 0) {
			return <div> Loading Categories...</div>
		}
		return (
				<div>
					<Header/>
					Home Screen
					<CategoryListDisplay categories={categories}/>
				</div>
			)
	}
}

const mapStateToProps = (state) => ({
	categories: getCategoryRelationTree(state)
})

const mapDispatchToProps = (dispatch) => ({
	loadCategories: () => dispatch(getCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)