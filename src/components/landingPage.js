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

		this.state = {
			buttonDisable: false
		}

		this.onSelectMealtime = this.onSelectMealtime.bind(this);
		this.onSelectCustomerNumber = this.onSelectCustomerNumber.bind(this);
		this.onClickNext = this.onClickNext.bind(this);
	}

	componentDidMount() {
		if(this.props.landing.mealtime === "----" || this.props.landing.numberOfPeople === "----") {
			this.props.sendError(true);
		} else {
			this.props.sendError(false);
		}
	}



 	componentWillReceiveProps(nextProps){
 		console.log("this is nextProps", nextProps);
    	if(nextProps.landing.mealtime !== this.props.landing.mealtime || 
    		nextProps.landing.numberOfPeople !== this.props.landing.numberOfPeople) {
    		if(nextProps.landing.mealtime === "----" || nextProps.landing.numberOfPeople === "----") {
				this.props.sendError(true);
			}
			else {
				console.log("there is no error");
				this.props.sendError(false);
				this.props.verifyLanding(true);
			}
    	}

    	if(nextProps.landing.mealtime !== this.props.landing.mealtime) {
			// console.log("this is the current mealtime", this.props.landing.mealtime);
			// console.log("this is nextProps mealtime", nextProps.landing.mealtime);
			// console.log("this is the current restaurant", this.props.restaurant.restaurant);
			// console.log("this is the result from checkRestaurant", this.checkRestaurant(nextProps));
			if(!this.checkRestaurant(nextProps)) {
				this.props.selectRestaurant("----");
			}
    	}
    }

    checkRestaurant(nextProps) {
    	// if restaurant is in mealtime, keep it
    	// else selectRestaurant update "----"
    	var tempRestaurant = this.props.restaurant.restaurant;
    	var restaurants = [];
		this.props.data.data.dishes.forEach((restaurant) => {
			if(restaurant.availableMeals.includes(nextProps.landing.mealtime) && !restaurants.includes(restaurant.restaurant)) {
				restaurants.push(restaurant.restaurant);
			}
		});

		if(restaurants.includes(tempRestaurant)) {
			return true;
		} 

		return false;
    }

	onSelectMealtime(eventKey) {
		var temp = this.props.landing.mealtime;
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
		this.props.sendPageIndex(2);
		this.props.history.push('/restaurantPage');
	}

	renderNextButton() {
		var nextButton;

		if(this.props.landing.mealtime === "----") {
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

	renderCustomerMessage() {
		var customerMessage;
		if(this.props.landing.numberOfPeople === "----") {
			customerMessage = (
				<div className={leftItem}>
					<p className={error}>
						Please select number of people!
					</p>
				</div>
			);
		} else {
			customerMessage = (
				<div className={leftItem}>
					Your selected number of people is
				</div>
			);
		}

		return customerMessage;
	}

	renderCustomerSelection() {
		return(
			<div className={containerItem}>
				<div className={divFlex}>
					<div className={leftItem}>
						{this.renderCustomerMessage()}
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
		data: state.data,
		error: state.error,
		restaurant: state.restaurant
	}
}

export default connect(mapStateToProps, actions)(LandingPage);