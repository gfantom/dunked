import React, { Component } from 'react';

export default class AboutMe extends Component {
	render() {
		return (
			<div className="demo5-cell-view" style={{style: "absolute",
					left: "210px", top: "40px",
					width: "690px",}}>
				<img src="/src/pics/testimage.png" alt="personal portait placeholder"
				style={{margin: "10px 10px 10px 10px", float: "right"}}/>
				<p>
					<h2>Jeffrey Ji</h2>
					<hr />
					<h3>Early life and education</h3>
					Jeffrey Ji, was born in Phoenix, Arizona on 1 June 1995. His propensity for fame and
					success was apparent from the onset. At the age of 6, he began his journey of mastering
					the piano. At the age of 10, he had retired from his athletic careers in soccer,
					basketball, and baseball before finally focusing on tennis.
					<br /><br />
					At 13, Jeffrey started
					playing video games, quickly achieving semi-pro status in games such as Team Fortress 2 and
					Battlefield: Bad Company 2 under the alias "gfantom". His aggressive playstyle, perfect
					mechanics, unparalleled team leadership and strategic mind quickly earned him a cult
					following in the gaming community.
					<br /><br />
					Near the end of his time at Palo Alto High School, the video game prodigy picked up a new game:
					DoTA 2. Though he excelled at this particular game as well, he turned down multiple offers
					from teams, instead opting to attend University of Califoria, Irvine to study physics.
					<h3>College and higher education</h3>
					During his first two years as university, Jeffrey was on track to achieve his B.S. in physics.
					However, after two stints in research labs, he decided that the research life was not for him.
					Halfway through his third year, he made to switch to study computer science in the Donald Bren
					School of Information and Computer Science. Currently, Jeffrey is still pursing his bachelor's
					degree, and is slated to graduate early 2018.
				</p>
			</div>
		);
	}
}