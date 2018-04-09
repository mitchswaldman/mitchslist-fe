import React from 'react'
import { connect } from 'react-redux'
import { search } from '../actions'
import { reduxForm, isDirty, Field, change, submit } from 'redux-form'
import { withRouter } from 'react-router-dom'
import { categoryFilterFormName } from '../constants'
import qs from 'qs'

class SearchBoxContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			text: ""
		}
		this.onSubmit = this.onSubmit.bind(this)
	}

	onSubmit = (values) => {
		this.props.dispatch(submit(categoryFilterFormName))
	}

	render() {
		const { dirty, categoryFormDirty, handleSubmit, onClick, collapsed} = this.props 
		return (
			<form onSubmit={handleSubmit} id="search-query-form">
				<button className="form-tab" onClick={onClick}>{collapsed ? '>>' : '<<'}</button>
				<Field name="text" component="input" type="text" placeholder="search mitchslist"  className="query"/>
				<button type="submit" className={`searchbtn ${(dirty || categoryFormDirty) ? 'dirty' : ''}`}>Search</button>
			</form>
		)
	}
}

const onChange = (values, dispatch, props, previousValue) => {
	dispatch(change(categoryFilterFormName, 'text', values['text']))
}

const onSubmit = (values, dispatch, props) => {
	return dispatch(submit(categoryFilterFormName))
}
const mapStateToProps = (state, { location: { search }}) => ({
	initialValues: {
		text: qs.parse(search, { ignoreQueryPrefix: true }).text || ""
	},
	categoryFormDirty: isDirty(categoryFilterFormName)(state)
})
export default withRouter(connect(mapStateToProps)(reduxForm({
	form: 'searchForm',
	onChange,
	onSubmit
})(SearchBoxContainer)))