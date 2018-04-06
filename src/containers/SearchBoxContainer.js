import React from 'react'
import { connect } from 'react-redux'
import { search } from '../actions'

class SearchBoxContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			text: ""
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange = (event) => {
	    const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;

	    this.setState({
	      [name]: value
	    });
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.props.search(this.state.text)
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input type="text" name="text" value={this.state.text} onChange={this.handleChange}/>
				<input type="submit" value="Submit"/>
			</form>
		)
	}
}

const mapStateToProps = (state) => ({
	pagination: state.pagination || {}
})

const mapDispatchToProps = (dispatch) => ({
	search: (text) => dispatch(search({text}))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBoxContainer)