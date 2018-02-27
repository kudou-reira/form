import React, { Component } from 'react';
import { css } from 'emotion';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions';

const containerItem = css`
	margin-top: 1%;
	margin:0 auto;
	width: 44%;
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

const marginTitle = css`
  margin-top: 2%;
`

const error = css`
  color: red;
`

const buttonCircle = css`
  width: 30px;
  height: 30px;
  padding: 6px 0px;
  border-radius: 15px;
  border-color:black;
  text-align: center;
  font-size: 12px;
  line-height: 1.42857;
`

class DishPage extends Component {
	constructor() {
		super();
		this.state = {
			recordedDishes: []
		}

		this.onClickPrevious = this.onClickPrevious.bind(this);
		this.onClickNext = this.onClickNext.bind(this);
		this.addDish = this.addDish.bind(this);
	}

	componentDidMount() {
		if(this.props.dish.dishCollection.length === 0) {
			this.addDish();
		}

		var dishes = this.createDishArray();
		this.props.recordDishes(dishes);
	}

	componentWillReceiveProps(nextProps){
 		console.log("this is nextProps", nextProps);
 		if(this.props.dish.dishCollection !== nextProps.dish.dishCollection) {
 			console.log("next servings", this.calculateServings(nextProps.dish).servings);
 			var tempServings = this.calculateServings(nextProps.dish).servings;
 			var number = nextProps.landing.numberOfPeople;
 			console.log("this is nextpropslength", number);

 			if(tempServings === 10) {
				this.props.sendErrorServing(true);
				this.props.sendError(false);
			} else if(tempServings <= 10 && tempServings >= nextProps.landing.numberOfPeople) {
				this.props.sendError(false);
				this.props.verifyDishes(true);
				this.props.sendErrorServing(false);
			} else if(tempServings < nextProps.landing.numberOfPeople) {
				this.props.sendError(true);
				this.props.sendErrorServing(false);
				this.props.verifyDishes(false);
			} else if(tempServings > 10) {
				this.props.sendErrorServing(true);
				this.props.sendError(true);
				this.props.verifyDishes(false);
			} 

			if(nextProps.dish.dishCollection.length === nextProps.dish.recordDishes.length) {
				console.log("send errorserving firing");
				this.props.sendErrorServing(true);
			}
 		}
  }

	onClickPrevious() {
		this.props.sendPageIndex(2);
		this.props.history.push('/restaurantPage');
	}

	onClickNext() {
		this.props.sendPageIndex(4);
		this.props.history.push('/reviewPage');
	}

	onSelectDish = (index) => (eventKey) => {
		// get a ref from dropdown
		// give this dish an id or something or ref
		// id of 1 for first item
		// { dish: burrito, id: 1, servings: something }

		// send the object here for select dish
		// send to props, update props, by id

		console.log("this is params index dish", index);
		this.props.dishCollectionUpdate(eventKey, index);
	}

	onSelectServing = (index) => (eventKey) => {
		// send to props, update props, by id
		console.log("this is params index for serving", index);
		this.props.dishCollectionUpdate(eventKey, index);
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
		if(this.props.error.error) {
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

	checkIfSelectedAlready(dish) {
		var tempCheck = this.props.dish.dishCollection.filter((dishInCollection) => {
			return dishInCollection.dish === dish;
		});

		if(tempCheck.length === 0) {
			return false;
		} else {
			return true;
		}
	}

	createDishArray() {
		var dishes = [];
		this.props.data.data.dishes.forEach((dish) => {
			if(dish.restaurant === this.props.restaurant.restaurant && dish.availableMeals.includes(this.props.landing.mealtime)
				&& !this.checkIfSelectedAlready(dish.name)) {
				if(!dishes.includes(dish.name)) {
					dishes.push(dish.name);
				}
			}
		});

		return dishes;
	}

	createDishItems(index) {
		// you get index here, so check if the index of this matches up with the index of the dishCollection item
		// if both are equal, render the dish item name in the dropdown
		// if they aren't, filter it out
		// filter out the current dishCollection dish names
		var dishes = this.createDishArray();

		console.log("this is dishes", dishes);
		console.log("this is the index", index);

		dishes = dishes.map((dish) => {
			return(
				<MenuItem 
					eventKey={dish} 
					onSelect={this.onSelectDish(index)}
				>
					{dish}
				</MenuItem>
			);
		});

		return dishes;
	}

	renderDishDropdown(dish) {
		// make the title of the dropdown equal to the mapped over index
		// find the index
		// can make it a function title={this.getTitle(index)}
		// getTitle index is id, filter the object from the
		return(
			<DropdownButton
	      bsStyle={"default"}
	      title={dish.dish}
	      id={"dishNames"}
	    >
	    	<MenuItem divider />
	      {this.createDishItems(dish.id)}
		  </DropdownButton>
		);
	}

	renderDishMessage(dish) {
		var dishMessage;
		if(dish.dish === "----") {
			dishMessage = (
				<div className={leftItem}>
					<p className={error}>
						Please select a dish!
					</p>
				</div>
			);
		} else {
			dishMessage = (
				<div className={leftItem}>
					<p>
						Your dish has been selected:
					</p>
				</div>
			);
		}

		return dishMessage;
	}

	renderDish(dish) {
		return (
			<div>
				{this.renderDishMessage(dish)}
				{this.renderDishDropdown(dish)}
			</div>
		);
	}

	createServingsItems(index) {
		var servingsItems;
		var servings = [];
		for(var i = 1; i <= 10; i++) {
			servings.push(i);
		}

		servingsItems = servings.map((serving) => {
			return(
				<MenuItem 
					eventKey={serving} 
					onSelect={this.onSelectServing(index)}
				>
					{serving}
				</MenuItem>
			);
		});

		return servingsItems;
	}

	renderServingsDropdown(dish) {
		return(
			<DropdownButton
	      bsStyle={"default"}
	      title={dish.servings}
	    >
	    	<MenuItem divider />
	      {this.createServingsItems(dish.id)}
		  </DropdownButton>
		);
	}

	// Please enter no. of servings

	renderServingsMessage() {
		var servingsMessage;
		servingsMessage = (
			<div className={leftItem}>
				<p>
					Your number of servings is:
				</p>
			</div>
		);
		return servingsMessage;
	}

	renderServings(dish) {
		return(
			<div>
				{this.renderServingsMessage()}
				<div className={marginTop}>
					{this.renderServingsDropdown(dish)}
				</div>
			</div>
		);
	}

	renderSelections() {
		var selections;
		// can also use the length of the array of already stored dishes
		// for now i'll use this, later on you also have to filter out previously selected dishes

		selections = this.props.dish.dishCollection.map((dish) => {
			return(
				<div className={marginTop}>
					<div className={containerItem}>
						<div className={divFlex}>
							<div className={leftItem}>
								{this.renderDish(dish)}
							</div>
							<div>
								{this.renderServings(dish)}
							</div>
						</div>
					</div>
				</div>
			);
		});

		return selections;
	}

	addDish() {
		// append a new element to dishCollection with the title ("----") and an id of whatever it's on
		var id = 0;
		// make id the last element of the dish, then add 1
		if(this.props.dish.dishCollection.length === 0) {
			id = 1;
		} else {
			id = this.props.dish.dishCollection[this.props.dish.dishCollection.length - 1].id + 1;
		}

		// create the object to be added;
		var tempObject = {
			id: id,
			dish: "----",
			servings: 1
		}
		this.props.addDish(tempObject);
		this.props.sendError(true);
		this.props.sendErrorServing(true);
	}

	renderAddDish() {
		return(
			<div>
				<Button className={buttonCircle} 
					onClick={this.addDish} 
					disabled={this.props.error.errorServing}
				>
					+
				</Button>
			</div>
		);
	}

	calculateServings(props) {
		var sum;
		sum = props.dishCollection.filter((dish) => {
			return dish.dish !== "----";
		})
		console.log("this is the current to be summed array", sum);

		if(sum.length !== 0) {
			sum = sum.reduce((a, b) => {
				return {servings: a.servings + b.servings}
			});
		} else if(sum.length === 0) {
			sum = {
				servings: 0
			};
		}

		return sum;
	}

	renderCustomerError() {
		// sum up all values in quantity/inventory
		var customerError = "";
		if(this.props.dish.dishCollection.length !== 0) {
			// filter out "----" first
			var sum = this.calculateServings(this.props.dish);

			console.log("this is the sum of all dishCollection", sum.servings);
			// send an error message if there's a problem, check docs for directions
			if(sum.servings > 10) {
				customerError = (
					<div className={error}>
						<p>
							The number of dishes has exceeded the maximum allowed amount of 10!
						</p>
					</div>
				);
			} else if(sum.servings < this.props.landing.numberOfPeople) {
				customerError = (
					<div className={error}>
						<p>
							The number of servings ({sum.servings}) is less than the number of customers ({this.props.landing.numberOfPeople})!
						</p>
						<p>
							Someone doesn't have enough to eat!
						</p>
					</div>
				);
			}
		}

		return customerError;
	}

	render() {
		return(
			<div className={marginTitle}>
				<div className={marginTop}>
					{this.renderSelections()}
				</div>
				<div className={containerItem}>
					<div className={divFlex}>
						<div className={marginTop}>
							{this.renderAddDish()}
						</div>
					</div>
				</div>
				<div className={marginTop}>
					{this.renderCustomerError()}
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
		landing: state.landing,
		dish: state.dish
	}
}

export default connect(mapStateToProps, actions)(DishPage);