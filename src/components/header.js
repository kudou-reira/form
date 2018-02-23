import React, { Component } from 'react';
import {ToggleButton, ToggleButtonGroup} from 'react-bootstrap';
import { css } from 'emotion';

const containerOverall = css`
	margin-top: 0.5%;	
`

class Header extends Component {
	render() {
		return(
			<div className={containerOverall}>
				<ToggleButtonGroup type="radio" name="options" defaultValue={1}>
		      <ToggleButton value={1}>Step 1</ToggleButton>
		      <ToggleButton value={2}>Step 2</ToggleButton>
		      <ToggleButton value={3}>Step 3</ToggleButton>
		      <ToggleButton value={4}>Review</ToggleButton>
		    </ToggleButtonGroup>
			</div>
		);
	}
}

export default Header;