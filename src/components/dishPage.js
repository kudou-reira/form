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

const marginTop2 = css`
  margin-top: 4%;
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
			itemIndex: 1
		}

		this.onClickPrevious = this.onClickPrevious.bind(this);
		this.onClickNext = this.onClickNext.bind(this);
		this.addDish = this.addDish.bind(this);
	}

	componentDidMount() {
		if(this.props.dish.dish === "----") {
			this.props.sendError(true);
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
		// { dish: burrito, id: 1, quantity: something }

		// send the object here for select dish
		// send to props, update props, by id
		console.log("this is params index dish", index);
		// create the object with the index, serving number, and dish
		// var tempObject = {
		// 	index: index,
		// 	servingsNumber: 1,
		// 	dish: eventKey
		// };

		// store by index

		// ex.
		// {
		// 	index: index,
		// 	dish: '',
		// 	servings: 1
		// }

		this.props.saveDish(eventKey);
		this.props.dishCollectionUpdate(eventKey, index);
		this.props.selectDish(eventKey);
		this.props.sendError(false);
	}

	onSelectServing = (index) => (eventKey) => {
		// send to props, update props, by id
		console.log("this is params index serving", index);

		this.props.dishCollectionUpdate(eventKey, index);
		// this.props.selectServings(eventKey);
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

	createDishItems(index) {
		// you get index here, so check if the index of this matches up with the index of the dishCollection item
		// if both are equal, render the dish item name in the dropdown
		// if they aren't, filter it out
		// filter out the current dishCollection dish names
		var dishes = [];
		this.props.data.data.dishes.forEach((dish) => {
			if(dish.restaurant === this.props.restaurant.restaurant && dish.availableMeals.includes(this.props.landing.mealtime)) {
				dishes.push(dish.name);
			}
		});

		console.log("this is dishes", dishes);
		console.log("this is the index", index);

		// send an object to selectDish
		// { dish: burrito, quantity: 1 }
		// when the quantity is updated, send another redux update
		// mark the quantity dropdown with a name somehow

		dishes = dishes.map((dish) => {
			return(
				<MenuItem eventKey={dish} onSelect={this.onSelectDish(index)}>{dish}</MenuItem>
			);
		});

		return dishes;
	}

	renderDishDropdown(index) {
		// make the title of the dropdown equal to the mapped over index
		// find the index
		// can make it a function title={this.getTitle(index)}
		// getTitle index is id, filter the object from the
		return(
			<DropdownButton
	      bsStyle={"default"}
	      title={this.props.dish.dish}
	    >
	    	<MenuItem divider />
	      {this.createDishItems(index)}
		  </DropdownButton>
		);
	}

	renderDishMessage() {
		var dishMessage;
		if(this.props.dish.dish === "----") {
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
					Your dish has been selected:
				</div>
			);
		}

		return dishMessage;
	}

	renderDish(index) {
		return (
			<div>
				{this.renderDishMessage()}
				{this.renderDishDropdown(index)}
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
				<MenuItem eventKey={serving} onSelect={this.onSelectServing(index)}>{serving}</MenuItem>
			);
		});

		return servingsItems;
	}

	renderServingsDropdown(index) {
		return(
			<DropdownButton
	      bsStyle={"default"}
	      title={this.props.dish.servings}
	    >
	    	<MenuItem divider />
	      {this.createServingsItems(index)}
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

	renderServings(index) {
		// add a check here if dishCollection is empty, return the default here
		// if dishCollection isn't empty, map over the dishCollection, display the information, then append a new default;
		return(
			<div>
				{this.renderServingsMessage()}
				<div className={marginTop}>
					{this.renderServingsDropdown(index)}
				</div>
			</div>
		);
	}

	renderSelections() {
		var selectionIndex = [];
		// can also use the length of the array of already stored dishes
		// for now i'll use this, later on you also have to filter out previously selected dishes
		// the dishes index will hold the already selected dishes
		for(var i = 1; i <= this.props.dish.numberOfDishes; i++) {
			selectionIndex.push(i);
		}

		var selections;
		// instead of mapping over selections, if this.props.dish.dishCollection.length === 0
		// render the default selection of two dropdowns

		// if the dishCollection length is greater than >0
		// return the mapped over dishCollection length, then append a default one with "----" for dish
		selections = selectionIndex.map((index) => {
			return(
				<div className={containerItem}>
					<div className={divFlex}>
						<div className={leftItem}>
							{this.renderDish(index)}
						</div>
						<div>
							{this.renderServings(index)}
						</div>
					</div>
				</div>
			);
		});

		return selections;
	}

	addDish() {
		// append a new element to dishCollection with the title ("----") and an id of whatever it's on
		this.props.addDish(1 + this.props.dish.numberOfDishes);
	}

	renderAddDish() {
		return(
			<div>
				<Button className={buttonCircle} 
					onClick={this.addDish} 
					disabled={this.props.error.error}
				>
					+
				</Button>
			</div>
		);
	}

	render() {
		console.log("this is number of dish selections", this.props.dish.selections);
		return(
			<div className={marginTitle}>
				<div className={marginTop}>
					{this.renderSelections()}
				</div>
				<div className={containerItem}>
					<div className={divFlex}>
						<div>
							{this.renderAddDish()}
						</div>
					</div>
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