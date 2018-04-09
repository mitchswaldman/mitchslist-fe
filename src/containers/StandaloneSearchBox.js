import React from 'react'
import { withRouter } from 'react-router-dom'
import { search } from '../actions'
import { getSearchResultsForQuery } from '../reducers'
import { connect } from 'react-redux'
import { reduxForm, Field, getFormValues } from 'redux-form'
import FacetedLink from '../utils/FacetedLink'
import keys from 'lodash/keys'
import qs from 'qs'
import './StandaloneSearchBox.css'
class StandaloneSearchBox extends React.Component {
	render() {
		const { handleSubmit, searchResults: {category_counts = {} } = {}, text } = this.props 
		const nonZeroResults = keys(category_counts)
			.filter(key => category_counts[key] && category_counts[key].count > 0)
			.map(key => category_counts[key])
		return (
			<form onSubmit={handleSubmit} id="standalone-search-form" autoComplete="off">
				<Field name="text" type="text" component="input" placeholder="search mitchslist"/>
				{nonZeroResults.length > 0 &&
					<ul>
					{nonZeroResults.map(result => {
						const { count, category: {name, short_name}} = result 
						return (
							<li key={short_name}>
								<FacetedLink query={{cat: short_name, text}}>
									<p>{count} results in {name}</p>
								</FacetedLink>
							</li>)
					})}
					</ul>
				}
			</form>
		)
	}
}

const onSubmit = (values, dispatch, { history }) => {
	const { text } = values
	if (text) {
		history.push(`/search?${qs.stringify(text)}`)
	}
}

const onChange = (values, dispatch, props, prevValue) => {
	const { text } = values
	if (text) {
		dispatch(search({text: values['text']}))
	}
}

const mapStateToProps = (state) => {
	const formValues = getFormValues('standaloneSearch')(state) || {}
	const { text } = formValues
	return {
		searchResults: getSearchResultsForQuery(state, {text}),
		text
	}
}

export default withRouter(
	connect(mapStateToProps)(
		reduxForm({
			form: 'standaloneSearch', 
			onChange, 
			onSubmit})(StandaloneSearchBox)))

