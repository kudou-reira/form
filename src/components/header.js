import React, { Component } from 'react';
import {ToggleButton, ToggleButtonGroup} from 'react-bootstrap';
import { css } from 'emotion';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { withRouter } from 'react-router';

const containerOverall = css`
	margin-top: 0.5%;	
`

class Header extends Component {
	constructor() {
		super();

		this.onClickToggle = this.onClickToggle.bind(this);
	}

	onClickToggle(e) {
		console.log("this is the e", e.target.value);
		console.log("this is type of e", typeof(e.target.value));
		var value = parseInt(e.target.value);

		switch(value) {
			case 1:
				this.props.sendPageIndex(value);
				this.props.history.push('/');
				break;
			case 2:
				console.log("this is option 2");
				this.props.sendPageIndex(value);
				this.props.history.push('/restaurantPage');
				break;
			case 3:
				this.props.sendPageIndex(value);
				this.props.history.push('/dishPage');
				break;
			default:
				this.props.sendPageIndex(value);
				this.props.history.push('/reviewPage');
				break;
		}
	}

	renderButtonAvailability(value) {
		var availableButtons;
		// have to make this sliding
		// put the verification for verifyLanding at the last
		// this is because you want to check whichever one is the most recently verified
		// probably want to add a verifyReview, and don't render header on that page

		if(this.props.dish.verifyDishes) {
			availableButtons = (
				<ToggleButtonGroup type="radio" name="options" value={this.props.pageIndex.page}>
					<ToggleButton value={1} onChange={this.onClickToggle} disabled={false}>Step 1</ToggleButton>
		      <ToggleButton value={2} onChange={this.onClickToggle} disabled={false}>Step 2</ToggleButton>
		      <ToggleButton value={3} onChange={this.onClickToggle} disabled={false}>Step 3</ToggleButton>
		      <ToggleButton value={4} onChange={this.onClickToggle} disabled={false}>Review</ToggleButton>
	      </ToggleButtonGroup>
			);
		}
		else if(this.props.restaurant.verifyRestaurant) {
			availableButtons = (
				<ToggleButtonGroup type="radio" name="options" value={this.props.pageIndex.page}>
					<ToggleButton value={1} onChange={this.onClickToggle} disabled={false}>Step 1</ToggleButton>
		      <ToggleButton value={2} onChange={this.onClickToggle} disabled={false}>Step 2</ToggleButton>
		      <ToggleButton value={3} onChange={this.onClickToggle} disabled={false}>Step 3</ToggleButton>
		      <ToggleButton value={4} onChange={this.onClickToggle} disabled={true}>Review</ToggleButton>
	      </ToggleButtonGroup>
			);
		}
		else if(this.props.landing.verifyLanding) {
			availableButtons = (
				<ToggleButtonGroup type="radio" name="options" value={this.props.pageIndex.page}>
					<ToggleButton value={1} onChange={this.onClickToggle} disabled={false}>Step 1</ToggleButton>
		      <ToggleButton value={2} onChange={this.onClickToggle} disabled={false}>Step 2</ToggleButton>
		      <ToggleButton value={3} onChange={this.onClickToggle} disabled={true}>Step 3</ToggleButton>
		      <ToggleButton value={4} onChange={this.onClickToggle} disabled={true}>Review</ToggleButton>
	      </ToggleButtonGroup>
			);
		} else {
			availableButtons = (
				<ToggleButtonGroup type="radio" name="options" value={this.props.pageIndex.page}>
					<ToggleButton value={1} onChange={this.onClickToggle} disabled={false}>Step 1</ToggleButton>
		      <ToggleButton value={2} onChange={this.onClickToggle} disabled={true}>Step 2</ToggleButton>
		      <ToggleButton value={3} onChange={this.onClickToggle} disabled={true}>Step 3</ToggleButton>
		      <ToggleButton value={4} onChange={this.onClickToggle} disabled={true}>Review</ToggleButton>
		    </ToggleButtonGroup>
			);
		}

		return availableButtons;
	}

	render() {
		// do a conditional here to render button availability if this.props.submitted.verifySubmitted is true of false
		return(
			<div className={containerOverall}>
		    {this.renderButtonAvailability()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		pageIndex: state.pageIndex,
		error: state.error,
		landing: state.landing,
		restaurant: state.restaurant,
		dish: state.dish,
		submitted: state.submitted
	}
}

export default connect(mapStateToProps, actions)(withRouter(Header));