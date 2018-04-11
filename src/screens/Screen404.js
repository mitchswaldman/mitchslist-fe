import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'

export default (props) => (
	<div>
	<Header/>
	<div className="home-wrapper">
		<h3> Hmm... Nothing here </h3>
		<p> Let's take you back home </p>
		<ul>
			<li><Link to="/">home</Link></li>
		</ul>
	</div>
	</div>
)