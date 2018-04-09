import React from 'react'
import PropTypes from 'prop-types'
import './CollapsibleList.css'

class CollapsibleList extends React.Component {
	state = {active: true}
	handleClick = () => {
		this.setState({
			active: !this.state.active
		})
	}
	render() {
		const { items, header } = this.props
		return (
			<ul className="menu collapsible">
				<li className="expand s">
					<h5 className={`ban hot ${this.state.active ? 'active' : ''}`} onClick={this.handleClick}>{header}</h5>
					<ul className={`acitem ${this.state.active ? '' : 'collapsed'}`}>
						{items.map(item => (
							<li key={item} className="s"><a href="#">{item}</a></li>
						))}
					</ul>
				</li>
			</ul>
		)	
	}
}

CollapsibleList.propTypes = {
	header: PropTypes.string.isRequired,
	items: PropTypes.array.isRequired
}

export default CollapsibleList