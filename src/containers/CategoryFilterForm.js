import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { reduxForm, Field, getFormValues, initialize } from 'redux-form'
import { pushSearchQuery, convertObjectKeysToArrays, convertObjectArraysToKeys } from '../helpers'
import { categoryFilterFormName } from '../constants'
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
				{values.map((value, idx) => (
					<React.Fragment key={value}>
						<label> {value} </label>
						<Field key={value} name={`${name.toLowerCase()}.${value}`} component='input' type='checkbox' />
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
	}

	render() {
		const { attributes = [], pristine, handleSubmit} = this.props
		if (attributes.length === 0 ) {
			return null
		}
		return (
			<form onSubmit={handleSubmit}>
				{attributes.map(attribute => {
					return (
						<div key={attribute.name} className='attribute-filter-container'>
							{renderAttribute(attribute)}
						</div>
					)
				})}
				<Field name="text" type="hidden" component="input"/>
				<button type='submit' className={pristine ? 'pristine' : 'dirty'}> Search </button>
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
	history.push(`/search?${qs.stringify(newQuery, { encode: false })}`)
}

const mapStateToProps = (state, { location: { search }}) => {
	const query = qs.parse(search, { ignoreQueryPrefix: true})
	return {
		initialValues: query,
		fields: state.form[categoryFilterFormName] && state.form[categoryFilterFormName].registeredFields || {}
	}
}

const mapDispatchtoProps = (dispatch) => ({
	initialize: (form, data) => dispatch(initialize(form, data))
})
export default withRouter(connect(mapStateToProps)(reduxForm({
	form: categoryFilterFormName,
	enableReinitialize: true,
	onSubmit
})(CategoryFilterForm)))