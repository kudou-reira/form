import React, { Component } from 'react';
import { css } from 'emotion';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import data from '../lib/dishes.json';

const containerOverall = css`
	margin-top: 1%;
`
const containerItem = css`
	margin-top: 1%;
	margin:0 auto;
	width: 22%;
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

const marginTitle = css`
  margin-top: 2%;
`

class LandingPage extends Component {
	constructor() {
		super();
		this.state = {
			mealSelect: "----"
		}

		this.onSelectMealtime = this.onSelectMealtime.bind(this);
	}

	onSelectMealtime(eventKey) {
		this.setState({ 
				mealSelect: eventKey 
			}, ()=> {
			console.log("this is the eventKey", eventKey);
		})
	}

	renderMealtimeSelect() {
		return(
			<div className={containerItem}>
				<div className={divFlex}>
					<div className={leftItem}>
						Please select a meal!
					</div>
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

		data.dishes.map((item) => {
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
					orderedMealtimes.push(orderedMeal);
				}
			}
		});

		orderedMealtimes.sort(function(a, b){
	    if(a.order < b.order) return -1;
	    if(a.order > b.order) return 1;
	    return 0;
		})

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
		      title={this.state.mealSelect}
		      id={"mealtime"}
		    >
		    	<MenuItem divider />
		      {this.createMealtimesItem()}
		    </DropdownButton>
		);
	}

	renderCustomerSelection() {
		return(
			<div className={containerItem}>
				Please enter the number of people
			</div>
		);
	}

	render() {
		console.log("this is dishes.json", data);

		return(
			<div className={containerOverall}>
				<div className={marginTitle}>
					Welcome to our restaurant
				</div>
				<div className={marginTop}>
					{this.renderMealtimeSelect()}
				</div>
				<div className={marginTop}>
					{this.renderCustomerSelection()}
				</div>
			</div>
		);
	}
}

export default LandingPage;