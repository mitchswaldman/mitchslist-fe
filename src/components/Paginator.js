import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './Paginator.css'
import qs from 'qs'

const Paginator = ({total, count, offset = 0, next, previous}) => {
	const nextUrl = next && next.substring(next.indexOf('?'))
	const prevUrl = previous && previous.substring(previous.indexOf('?'))
	const query = prevUrl && qs.parse(prevUrl, {ignoreQueryPrefix: true}) || {}
	delete query.offset
	return (
		<div className="paginator buttongroup firstpage">
			<span className="buttons">
				{prevUrl && <span className="prev"><Link to={`/search?${qs.stringify(query)}`}>&#60;&#60;</Link></span>}
				{prevUrl && <span className="prev"><Link to={`/search${prevUrl}`}>&#60; prev</Link></span>}
				<span className="range">{offset + 1} - {offset + count} / {total}</span>
				{nextUrl && <span className="next"><Link to={`/search${nextUrl}`}>next &#62;</Link></span>}
			</span>
		</div>
	)
}

Paginator.propTypes = {
	total: PropTypes.number.isRequired,
	count: PropTypes.number.isRequired,
	offset: PropTypes.number,
	next: PropTypes.string,
	previous: PropTypes.string
}

export default Paginator