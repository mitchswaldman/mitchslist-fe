import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'

export default (props) => (
	<div>
		<Header/>
		<div className="home-wrapper">
			<h3> Only Mitch can login </h3>
			<h5> ...and only Mitch knows how.</h5>
			<p> Let's go back home </p>
			<ul>
				<li><Link to="/">home</Link></li>
			</ul> 
		</div>
	</div>
)