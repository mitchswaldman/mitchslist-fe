import React from 'react'
import { connect } from 'react-redux'
import { getCategories } from '../actions'
import { getCategoryRelationTree } from '../reducers'
import MediaQuery from 'react-responsive'
import CategoryListDisplay from '../components/CategoryListDisplay'
import Header from '../components/Header'
import SiteColumn from '../components/SiteColumn'
import CollapsibleList from '../components/CollapsibleList'
import StandaloneSearchBox from '../containers/StandaloneSearchBox'
import './HomeScreen.css'

class HomeScreen extends React.Component {
	componentDidMount() {
		this.props.loadCategories()
	}

	render() {
		const { categories = [] } = this.props
		if (categories.length === 0) {
			return <div> Loading Categories...</div>
		}
		return (
				<div className="home-wrapper">
					<MediaQuery minWidth={750}>
						<div id="topban">
							mitch is in the SF Bay Area
						</div>
						<div id="leftbar">
							<SiteColumn/>
						</div>
						<div id="center">
							<CategoryListDisplay categories={categories}/>
						</div>
						<div id="rightbar">
							<CollapsibleList header={'cities'} items={['san jose', 'san francisco', 'portland', 'new york', 'white bird', 'santa clarita']}/>
						</div>
					</MediaQuery>
					<MediaQuery maxWidth={750}>
						<Header/>
						<div id="topban">
							mitch is in the SF Bay Area
						</div>
						<StandaloneSearchBox />
						<CategoryListDisplay categories={categories}/>
					</MediaQuery>
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