import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Paginator = ({total, count, offset = 0, next, previous}) => {
	const nextUrl = next && next.substring(next.indexOf('?'))
	const prevUrl = previous && previous.substring(previous.indexOf('?'))

	return (
		<div>
			{prevUrl && <Link to={`/search${prevUrl}`}>&#60;&#60;</Link>}
			<span>{offset + 1} - {offset + count} / {total}</span>
			{nextUrl && <Link to={`/search${nextUrl}`}>&#62;&#62;</Link>}
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