import React, { Component } from 'react';
import { css } from 'emotion';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions';

const containerOverall = css`
	margin-top: 1%;
`
const containerItem = css`
	margin-top: 1%;
	margin:0 auto;
	width: 55%;
`

const containerItem2 = css`
	margin-top: 1%;
	margin:0 auto;
	width: 35%;
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

class DishPage extends Component {
	constructor() {
		super();

		this.onClickPrevious = this.onClickPrevious.bind(this);
		this.onClickNext = this.onClickNext.bind(this);
	}

	onClickPrevious() {
		this.props.sendPageIndex(2);
		this.props.history.push('/restaurantPage');
	}

	onClickNext() {
		this.props.sendPageIndex(4);
		this.props.history.push('/reviewPage');
	}

	renderPreviousButton() {
		return(
			<Button onClick={this.onClickPrevious}>
				Previous
			</Button>
		);
	}

	renderNextButton() {
		var nextButton;
		if(this.props.restaurant.restaurant === "----") {
			// disable button
			// send disable button to reducers as a boolean proof of error
			nextButton = (
				<div className={containerItem2}>
					<div className={divFlex}>
						<Button 
							onClick={this.onClickNext}
							disabled={this.props.error.error}
						>
							Next
						</Button>
					</div>
				</div>
			);

		} else {
			nextButton = (
				<div className={containerItem2}>
					<div className={divFlex}>
						<Button 
							onClick={this.onClickNext}
							disabled={this.props.error.error}
						>
							Next
						</Button>
					</div>
				</div>
			);
		}

		return nextButton;
	}

	renderNavigationButtons() {
		return(
			<div className={containerItem2}>
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

	renderDishDropdown() {
		return(
			<div>
				Dish dropdown should be here
			</div>
		);
	}

	renderDish() {
		return (
			<div>
				Please select a dish
				{this.renderDishDropdown()}
			</div>
		);
	}

	renderServingsDropdown() {
		return(
			<div>
				Servings dropdown should be here
			</div>
		);
	}

	renderServings() {
		return(
			<div>
				Please enter no. of servings
				{this.renderServingsDropdown()}
			</div>
		);
	}

	renderSelections() {
		return(
			<div className={containerItem}>
				<div className={divFlex}>
					<div className={leftItem}>
						{this.renderDish()}
					</div>
					<div>
						{this.renderServings()}
					</div>
				</div>
			</div>
		);
	}

	render() {
		return(
			<div className={marginTitle}>
				<div className={marginTop}>
					{this.renderSelections()}
				</div>
				<div className={marginTop}>
					{this.renderNavigationButtons()}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		pageIndex: state.pageIndex,
		error: state.error,
		data: state.data,
		restaurant: state.restaurant,
		landing: state.landing
	}
}

export default connect(mapStateToProps, actions)(DishPage);