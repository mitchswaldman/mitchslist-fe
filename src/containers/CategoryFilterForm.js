import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { reduxForm, reset, Field, getFormValues, initialize } from 'redux-form'
import { pushSearchQuery, convertObjectKeysToArrays, convertObjectArraysToKeys } from '../helpers'
import { categoryFilterFormName } from '../constants'
import CheckboxGroup from '../utils/CheckboxGroup'
import merge from 'lodash/merge'
import keys from 'lodash/keys'
import pickBy from 'lodash/pickBy'
import qs from 'qs'
import './CategoryFilterForm.css'

const renderRangeInput = (name, type) => (
	<div className="searchgroup">
		<span aria-label={name} className='searchlabel'>{name} </span>
		<Field name={`min_${name.toLowerCase()}`} component='input' type={type} placeholder={`min`} className="flatinput"/>
		<Field name={`max_${name.toLowerCase()}`} component='input' type={type} placeholder={`max`} className="flatinput"/>
	</div>
)
const renderAttribute = (attribute) => {
	const {name, unit, input_widget, input_type, input_values } = attribute 
	
	if (input_widget === 'select') {
		const values = input_values && input_values.values || []
		return (
			<React.Fragment>
				<label aria-label={name}> {name} </label>
				<CheckboxGroup name={name} options={values.map(value => ({label: value, value}))}/>
			</React.Fragment>
		)
	}

	if (input_widget === 'input') {
		return renderRangeInput(name, input_type)
	}
}

class CategoryFilterForm extends React.Component {
	constructor(props) {
		super(props)
	}
	reset = () => {
		this.props.reset()
		this.props.resetRemote('categoryFacetForm')
	}

	render() {
		const { attributes = [], dirty, handleSubmit, history, location: { search }} = this.props
		if (attributes.length === 0 ) {
			return null
		}
		return (
			<form onSubmit={handleSubmit} className="category-filter-form">
				{attributes.map(attribute => {
					return (
						<div key={attribute.name} className='attribute-filter-container'>
							{renderAttribute(attribute)}
						</div>
					)
				})}
				<Field name="text" type="hidden" component="input"/>
				<div className="searchgroup resetsearch">
					<a onClick={this.reset} className="reset">reset</a>
					<button type='submit' className={`searchlink linklike ${dirty ? 'dirty' : ''}`}> Search </button>
				</div>
			</form>
		)
	}
}

CategoryFilterForm.propTypes = {
	attributes: PropTypes.array.isRequired
}

const onSubmit = (values, dispatch, props) => {
	const { initialValues, history, fields } = props 
	let newQuery = pushSearchQuery(initialValues, values)
	history.push(`/search?${qs.stringify(newQuery, {indices: false})}`)
}

const mapStateToProps = (state, { location: { search }}) => {
	const query = qs.parse(search, { ignoreQueryPrefix: true})
	if (query.ex_cats && !Array.isArray(query.ex_cats)) {
		query.ex_cats = [query.ex_cats]
	}
	return {
		initialValues: query,
		fields: state.form[categoryFilterFormName] && state.form[categoryFilterFormName].registeredFields || {}
	}
}

const mapDispatchtoProps = (dispatch) => ({
	resetRemote: (form) => dispatch(reset(form))
})
export default withRouter(connect(mapStateToProps, mapDispatchtoProps)(reduxForm({
	form: categoryFilterFormName,
	enableReinitialize: true,
	onSubmit
})(CategoryFilterForm)))