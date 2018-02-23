import React, { Component  } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './header';
import LandingPage from './landingPage';
import RestaurantPage from './restaurantPage';
import DishPage from './dishPage';
import ReviewPage from './reviewPage';
import SubmittedPage from './submittedPage';

class App extends Component {
	render(){
		return (
			<div>
				<BrowserRouter>
					<div>
						<Header />
						<Route exact path="/" component={LandingPage} />
						<Route path='/restaurantPage' component={RestaurantPage} />
						<Route path="/dishPage" component={DishPage} />
						<Route path="/reviewPage" component={ReviewPage} />
						<Route path="/submittedPage" component={SubmittedPage} />
					</div>
				</BrowserRouter>
			</div>
		);
	}
};

export default connect(null, actions)(App);