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

class RestaurantPage extends Component {

	constructor() {
		super();

		this.onClickPrevious = this.onClickPrevious.bind(this);
		this.onClickNext = this.onClickNext.bind(this);
		this.onSelectRestaurant = this.onSelectRestaurant.bind(this);
	}

	componentDidMount() {
		if(this.props.restaurant.restaurant === "----") {
			this.props.sendError(true);
		}
	}

	componentWillReceiveProps(nextProps){
 		console.log("this is nextProps", nextProps);
    	if(nextProps.restaurant.restaurant !== this.props.restaurant.restaurant) {
    		if(nextProps.restaurant.restaurant === "----") {
				this.props.sendError(true);
			}
			else {
				console.log("there is no error");
				this.props.sendError(false);
				this.props.verifyRestaurant(true);
			}
  	}
  }

	onClickPrevious() {
		this.props.sendPageIndex(1);
		this.props.history.push('/');
	}

	onClickNext() {
		this.props.sendPageIndex(3);
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

	renderRestaurantSelect() {
		return(
			<div className={containerItem}>
				<div className={divFlex}>
					{this.renderRestaurantMessage()}
					<div>
						{this.renderRestaurantDropdown()}
					</div>
				</div>
			</div>
		);
	}

	renderRestaurantMessage() {
		var restaurantMessage;
		if(this.props.restaurant.restaurant === "----") {
			restaurantMessage = (
				<div className={leftItem}>
					<p className={error}>
						Please select a restaurant!
					</p>
				</div>
			);
		} else {
			restaurantMessage = (
				<div className={leftItem}>
					Your restaurant has been selected
				</div>
			);
		}

		return restaurantMessage;
	}

	onSelectRestaurant(eventKey) {
		this.props.selectRestaurant(eventKey);
	}

	renderRestaurantDropdown() {
		return(
			<DropdownButton
	      bsStyle={"default"}
	      title={this.props.restaurant.restaurant}
	      id={"restaurant"}
	    >
		    	<MenuItem divider />
		      {this.createRestaurantItem()}
		  </DropdownButton>
		);
	}

	createRestaurantItem() {
		var restaurants = [];

		this.props.data.data.dishes.forEach((restaurant) => {
			if(restaurant.availableMeals.includes(this.props.landing.mealtime) && !restaurants.includes(restaurant.restaurant)) {
				restaurants.push(restaurant.restaurant);
			}
		}) 

		restaurants = restaurants.map((restaurant) => {
			return(
				<MenuItem eventKey={restaurant} onSelect={this.onSelectRestaurant}>{restaurant}</MenuItem>
			);
		});
		// console.log("this is availableRestaurants", availableRestaurants);
		return restaurants;
	}

	render() {
		return(
			<div className={marginTitle}>
				<div className={marginTop}>
					{this.renderRestaurantSelect()}
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

export default connect(mapStateToProps, actions)(RestaurantPage);