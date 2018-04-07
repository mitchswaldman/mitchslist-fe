import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { reduxForm, Field, getFormValues, initialize } from 'redux-form'
import { pushSearchQuery } from '../helpers'
import merge from 'lodash/merge'
import keys from 'lodash/keys'
import pickBy from 'lodash/pickBy'
import qs from 'qs'

const renderRangeInput = (name, type) => (
	<React.Fragment>
		<label aria-label={name}>{name} </label>
		<Field name={`min_${name.toLowerCase()}`} component='input' type={type} placeholder={`min ${name}`}/>
		<Field name={`max_${name.toLowerCase()}`} component='input' type={type} placeholder={`max ${name}`}/>
	</React.Fragment>
)
const renderAttribute = (attribute) => {
	const {name, unit, input_widget, input_type, input_values } = attribute 
	
	if (input_widget === 'select') {
		const values = input_values && input_values.values || []
		return (
			<React.Fragment>
				<label aria-label={name}> {name} </label>
				{values.map(value => (
					<React.Fragment key={value}>
						<label> {value} </label>
						<Field key={value} name={`${name.toLowerCase()}`} component='input' type='checkbox' />
					</React.Fragment>
				))}
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
		this.onSubmit = this.onSubmit.bind(this)
	}

	onSubmit = (values) => {
		const { initialValues, history, fields } = this.props 
		const fieldNames = keys(fields)
		const pickedInitalValues = pickBy(initialValues, (value, key) => fieldNames.indexOf(key) > -1)
		const mergedValues = merge({}, pickedInitalValues, values)
		const formKeys = keys(values).filter(key => fieldNames.indexOf(key) > -1)
		const formQuery = pickBy(mergedValues, (value, key) => formKeys.indexOf(key) > -1)
		const unknownQueryParams = pickBy(initialValues, (value, key) => fieldNames.indexOf(key) < 0)
		history.push(`/search?${qs.stringify(merge({}, unknownQueryParams, formQuery))}`)
	}

	render() {
		const { attributes = [], pristine, handleSubmit} = this.props
		if (attributes.length === 0 ) {
			return null
		}
		return (
			<form onSubmit={handleSubmit(this.onSubmit)}>
				{attributes.map(attribute => {
					return (
						<div key={attribute.name} className='attribute-filter-container'>
							{renderAttribute(attribute)}
						</div>
					)
				})}
				<button type='submit' className={pristine ? 'pristine' : 'dirty'}> Search </button>
			</form>
		)
	}
}

CategoryFilterForm.propTypes = {
	attributes: PropTypes.array.isRequired
}

const mapStateToProps = (state, { location: { search }}) => {
	const query = qs.parse(search, { ignoreQueryPrefix: true })
	return {
		initialValues: query,
		fields: state.form['categoryFilterForm'] && state.form['categoryFilterForm'].registeredFields || {}
	}
}

const mapDispatchtoProps = (dispatch) => ({
	initialize: (form, data) => dispatch(initialize(form, data))
})
export default withRouter(connect(mapStateToProps)(reduxForm({
	form: 'categoryFilterForm',
	enableReinitialize: true
})(CategoryFilterForm)))