import React, { Component } from 'react';
import { css } from 'emotion';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';

const containerOverall = css`
	margin-top: 1%;
`
const containerItem = css`
	margin-top: 1%;
	margin:0 auto;
	width: 25%;
`

const containerItem2 = css`
	margin-top: 1%;
	margin:0 auto;
	width: 25%;
`

const divFlex = css`
  display:-webkit-flex;
  display:flex;
  padding:0;
  justify-content:flex-end;
`

const leftItem = css`
  margin-right:auto;
`

const marginTop = css`
  margin-top: 2.5%;
`

const marginTop2 = css`
  margin-top: 4%;
`

const marginTitle = css`
  margin-top: 2%;
`

const error = css`
  color: red;
`

class RestaurantPage extends Component {

	constructor() {
		super();

		this.onClickPrevious = this.onClickPrevious.bind(this);
		this.onClickNext = this.onClickNext.bind(this);
	}

	onClickPrevious() {
		this.props.history.push('/');
	}

	onClickNext() {
		this.props.history.push('/dishPage');
	}

	renderPreviousButton() {
		return(
			<Button onClick={this.onClickPrevious}>
				Previous
			</Button>
		);
	}

	renderNextButton() {
		return(
			<Button onClick={this.onClickNext}>
				Next
			</Button>
		);
	}

	renderNavigationButtons() {
		return(
			<div className={containerItem}>
				<div className={divFlex}>
					<div className={leftItem}>
						{this.renderPreviousButton()}
					</div>
					<div>
						{this.renderNextButton()}
					</div>
				</div>
			</div>
		);
	}

	render() {
		return(
			<div className={marginTitle}>
				This is the Restaurant page
				<div className={marginTop}>
					{this.renderNavigationButtons()}
				</div>
			</div>
		);
	}
}

export default RestaurantPage;