import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './Header.css'

const Header = ({favorites}) => {
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
					{Object.keys(favorites).length > 0 &&
						<li>
							<Link to="/favorites" className="favorites">
								<i className="fas fa-star"></i>
								&nbsp;
								{Object.keys(favorites).length}&nbsp;favorited
							</Link>
						</li>
					}
					<li className="user account">
						<Link to="/login">account</Link>
					</li>
				</ul>
			</div>
		</header>
	)
}

const mapStateToProps = (state) => ({
	favorites: state.favorites
})

export default connect(mapStateToProps)(Header)