import React, { Component } from 'react';
import { css } from 'emotion';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions';
// import { withRouter } from 'react-router';

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

class LandingPage extends Component {
	constructor() {
		super();

		this.onSelectMealtime = this.onSelectMealtime.bind(this);
		this.onSelectCustomerNumber = this.onSelectCustomerNumber.bind(this);
		this.onClickNext = this.onClickNext.bind(this);
	}

	// componentDidMount() {
	// 	this.props.selectMealtime("----");
	// 	this.props.selectPeople(1);
	// }

	onSelectMealtime(eventKey) {
		this.props.selectMealtime(eventKey);
	}

	renderMealMessage() {
		var mealMessage;
		if(this.props.landing.mealtime === "----") {
			mealMessage = (
				<div className={leftItem}>
					<p className={error}>
						Please select a mealtime!
					</p>
				</div>
			);
		} else {
			mealMessage = (
				<div className={leftItem}>
					Your mealtime has been selected:
				</div>
			);
		}

		return mealMessage;
	}

	renderMealtimeSelect() {
		return(
			<div className={containerItem}>
				<div className={divFlex}>
					{this.renderMealMessage()}
					<div>
						{this.renderMealtimeDropdown()}
					</div>
				</div>
			</div>
		);
	}

	createMealtimesItem() {
		// scalable sort for mealtime, creates it in order "breakfast", "lunch", "dinner"
		var orderedMealtimes = [];
		var orderedMeal = {};
		var mealtimesMenuItem;

		this.props.data.data.dishes.forEach((item) => {
			var availableMeals = item.availableMeals;
			for(let meal of availableMeals) {
				if(!(orderedMealtimes.some(item => item.mealtime === meal))) {
					if(meal === "breakfast") {
						orderedMeal = {
							mealtime: "breakfast",
							order: 0
						}
					} else if (meal === "lunch") {
						orderedMeal = {
							mealtime: "lunch",
							order: 1
						}
					} else if (meal === "dinner") {
						orderedMeal = {
							mealtime: "dinner",
							order: 2
						}
					}

					// only implemented for three mealtimes
					if(orderedMealtimes.length === 0 || orderedMealtimes[orderedMealtimes.length-1].order < orderedMeal.order) {
						orderedMealtimes.push(orderedMeal);
					} else if(orderedMealtimes[orderedMealtimes.length-1].order > orderedMeal.order) {
						orderedMealtimes.unshift(orderedMeal);
					}
				}
			}
		});

		// orderedMealtimes.sort(function(a, b){
	 //    if(a.order < b.order) return -1;
	 //    if(a.order > b.order) return 1;
	 //    return 0;
		// })

		console.log("this is orderedMealtimes", orderedMealtimes);

		mealtimesMenuItem = orderedMealtimes.map((meal) => {
			return(
				<MenuItem eventKey={meal.mealtime} onSelect={this.onSelectMealtime}>{meal.mealtime.charAt(0).toUpperCase() + meal.mealtime.slice(1)}</MenuItem>
			);
		})

		return mealtimesMenuItem;
	}

	// mealtime should come from the reducer eventually
	// maybe all should come from reducer
	renderMealtimeDropdown() {
		return(
			<DropdownButton
		      bsStyle={"default"}
		      title={this.props.landing.mealtime}
		      id={"mealtime"}
		    >
		    	<MenuItem divider />
		      {this.createMealtimesItem()}
		  </DropdownButton>
		);
	}

	onSelectCustomerNumber(eventKey) {
		this.props.selectPeople(eventKey);
	}

	renderCustomerDropdown() {
		// populate array first
		var customerNumber = [];
		var customerMenuItem = [];

		for(var i = 1; i <= 10; i++) {
			customerNumber.push(i);
		}

		customerMenuItem = customerNumber.map((num) => {
			return(
				<MenuItem eventKey={num} onSelect={this.onSelectCustomerNumber}>
					{num}
				</MenuItem>
			);
		});

		return(
			<DropdownButton
	      bsStyle={"default"}
	      title={this.props.landing.numberOfPeople}
	      id={"customerNumber"}
	    >
	    	<MenuItem divider />
	      {customerMenuItem}
		  </DropdownButton>
		);
	}

	onClickNext() {
		console.log("this is onclicknext");
		this.props.history.push('/restaurantPage');
	}

	renderNextButton() {
		var nextButton;

		nextButton = (
			<div className={containerItem2}>
				<div className={divFlex}>
					<Button onClick={this.onClickNext}>
						Next
					</Button>
				</div>
			</div>
		);

		return nextButton;
	}

	renderCustomerSelection() {
		return(
			<div className={containerItem}>
				<div className={divFlex}>
					<div className={leftItem}>
						Please enter number of people:
					</div>
					<div>
						{this.renderCustomerDropdown()}
					</div>
				</div>
			</div>
		);
	}

	render() {
		console.log("this is data reducer", this.props.data.data.dishes);

		return(
			<div className={containerOverall}>
				<div className={marginTitle}>
					Welcome to our restaurant!
				</div>
				<div className={marginTop}>
					{this.renderMealtimeSelect()}
				</div>
				<div className={marginTop}>
					{this.renderCustomerSelection()}
				</div>
				<div className={marginTop2}>
					{this.renderNextButton()}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		landing: state.landing,
		data: state.data
	}
}

export default connect(mapStateToProps, actions)(LandingPage);