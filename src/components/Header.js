import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = (props) => {
	return (
		<header className="global-header wide">
			<Link to="/" className="header-logo">ML</Link>
			<nav className="breadcrumbs-container">
				<ul className="breadcrumbs">
					<li className="crumb area">
						SF Bay area
					</li>
				</ul>
			</nav>
			<div className="userlinks">
				<ul className="user-actions">
					<li className="user account">
						<Link to="/login">account</Link>
					</li>
				</ul>
			</div>
		</header>
	)
}

export default Header