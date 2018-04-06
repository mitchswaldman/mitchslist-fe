import React from 'react'
import { Link } from 'react-router-dom'

const Header = (props) => {
	return (
		<ul>
			<li>
				<Link to="/"> Home </Link>
			</li>
			<li>
				<Link to="/search"> Search </Link>
			</li>
		</ul>
	)
}

export default Header