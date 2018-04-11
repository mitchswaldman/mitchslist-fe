import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Header from '../components/Header'

const AboutMitch = (props) => {
	return (
		<div>
		<h2> About Mitch </h2>
		<p>
			My name is Mitch Waldman. I'm a software engineer living in the Bay Area. I love dogs, making music, beer, 
			and, well, software. I hope you enjoy the site!
		</p>
		</div>
	)
}

const MitchApplying = (props) => {
	return (
		<div>
		<h2> Mitch is applying in SF </h2>
		<p>
			I am currently looking for work in the SF Bay Area, and I'd love to work for Craigslist. So I put this site together 
			in an attempt to try and make Craig notice me... Craig?
		</p>
		</div>
	)
}

const About404 = (props) => {
	return (
		<div>
		<h3> Hmm nothing here... </h3>
		<p>
			Perhaps you meant one of these links:
		</p>
		<ul>
			<li><Link to="/about/mitch">about mitch</Link></li>
			<li><Link to="/about/mitch_is_applying">mitch is applying</Link></li>
		</ul>
		</div>
	)
}
const AboutScreen = ({match}) => (
	<React.Fragment>
		<Header/>
		<div className="home-wrapper">
			<Switch>
				<Route path={`${match.path}/mitch`} component={AboutMitch}/>
				<Route path={`${match.path}/mitch_is_applying`} component={MitchApplying}/>
				<Route path={match.path} component={About404}/>
			</Switch>
		</div>
	</React.Fragment>
)

export default AboutScreen