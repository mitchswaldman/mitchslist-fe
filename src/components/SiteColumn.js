import React from 'react'
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive'
import StandaloneSearchBox from '../containers/StandaloneSearchBox'
import './SiteColumn.css'

export default (props) => {
	return (
		<div className="site-column">
			<div id="logo" className="center">
				<Link to="/about/mitch"> mitchslist </Link>
			</div>
			<ul className="postlks">
				<li>
					<Link to="#"> mitchs account </Link>
				</li>
			</ul>
			<div className="center">
				<StandaloneSearchBox />
			</div>
			<ul className="postlks">
				<li>
					<Link to="/about/mitch"> about mitchslist </Link>
				</li>
				<li>
					<Link to ="/about/mitch_is_applying"> mitch is looking for work in sf </Link>
				</li>
				<li>
					<a href="https://github.com/mitchswaldman"> mitchslist opensource</a>
				</li>
			</ul>
		</div>
	)
}