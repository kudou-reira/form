import React, { Component } from 'react';
import { css } from 'emotion';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions';

const containerItem = css`
	margin-top: 1%;
	margin:0 auto;
	width: 35%;
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
  margin-top: 6%;
`

const marginTitle = css`
  margin-top: 2%;
`

class ReviewPage extends Component {
	constructor() {
		super();

		this.onClickPrevious = this.onClickPrevious.bind(this);
		this.onClickSubmit = this.onClickSubmit.bind(this);
	}

	onClickPrevious() {
		this.props.sendPageIndex(3);
		this.props.history.push('/dishPage');
	}

	onClickSubmit() {
		this.props.sendPageIndex(4);
		this.props.history.push('/submittedPage');

		// console log all the stuff
		console.log("MEALTIME:", this.props.landing.mealtime);
		console.log("NUMBER OF PEOPLE:", this.props.landing.numberOfPeople);
		console.log("RESTAURANT:", this.props.restaurant.restaurant);
		console.log("DISHES:", this.props.dish.dishCollection);
	}

	renderPreviousButton() {
		return(
			<Button onClick={this.onClickPrevious}>
				Previous
			</Button>
		);
	}

	renderSubmitButton() {
		var submitButton;
		submitButton = (
			<div className={containerItem2}>
				<div className={divFlex}>
					<Button 
						onClick={this.onClickSubmit}
					>
						Submit
					</Button>
				</div>
			</div>
		);

		return submitButton;
	}

	renderMealtime() {
		return(
			<div className={marginTop}>
				<div className={divFlex}>
					<div className={leftItem}>
						<p>
							Your selected meal time is:
						</p>
					</div>
					<p>
						{this.props.landing.mealtime}
					</p>
				</div>
			</div>
		);
	}

	renderCustomerNumber() {
		return(
			<div className={marginTop}>
				<div className={divFlex}>
					<div className={leftItem}>
						<p>
							Your selected number of customers is:
						</p>
					</div>
					<p>
						{this.props.landing.numberOfPeople}
					</p>
				</div>
			</div>
		);
	}

	renderRestaurant() {
		return(
			<div className={marginTop}>
				<div className={divFlex}>
					<div className={leftItem}>
						<p>
							Your selected restaurant is:
						</p>
					</div>
					<p>
						{this.props.restaurant.restaurant}
					</p>
				</div>
			</div>
		);
	}

	renderList() {
		return(
			<div className={marginTop2}>
				<div className={divFlex}>
					<div className={leftItem}>
						<p>
							The items ordered are listed below:
						</p>
					</div>
				</div>
			</div>
		);
	}

	renderDishes() {
		var tempDishes;
		tempDishes = this.props.dish.dishCollection.map((dish) => {
			return(
				<div className={marginTop}>
					<div className={divFlex}>
						<div className={leftItem}>
							<p>
								{dish.dish}:
							</p>
						</div>
						<p>
							{dish.servings}
						</p>
					</div>
				</div>
			);
		});

		return tempDishes;
	}

	renderNavigationButtons() {
		return(
			<div className={containerItem2}>
				<div className={divFlex}>
					<div className={leftItem}>
						{this.renderPreviousButton()}
					</div>
					<div>
						{this.renderSubmitButton()}
					</div>
				</div>
			</div>
		);
	}

	renderConfirmation() {
		return(
			<div className={marginTop2}>
				<div className={divFlex}>
					<div className={leftItem}>
						<p>
							If all the details look fine, please submit your order/reservation!
						</p>
					</div>
				</div>
			</div>
		);
	}

	renderAll() {
		return(
			<div>
				<div className={containerItem}>
					{this.renderMealtime()}
					{this.renderCustomerNumber()}
					{this.renderRestaurant()}
					{this.renderList()}
					{this.renderDishes()}
					{this.renderConfirmation()}
				</div>
				{this.renderNavigationButtons()}
			</div>
		);
	}

	render() {
		return(
			<div className={marginTitle}>
				{this.renderAll()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		pageIndex: state.pageIndex,
		restaurant: state.restaurant,
		landing: state.landing,
		dish: state.dish
	}
}

export default connect(mapStateToProps, actions)(ReviewPage);