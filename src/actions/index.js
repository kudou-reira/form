import { 
	SELECT_MEALTIME,
	SELECT_PEOPLE,
	SELECT_RESTAURANT,
	DISH_COLLECTION_UPDATE,
	DISH_COLLECTION_RESET,
	ADD_DISH,
	VERIFY_LANDING,
	VERIFY_RESTAURANT,
	VERIFY_DISHES,
	PAGE_INDEX ,
	ERROR,
	ERROR_SERVING
} from './types';

export const selectMealtime = (mealtime) => {
	return({
		type: SELECT_MEALTIME,
		payload: mealtime
	})
}

export const selectPeople = (num) => {
	return({
		type: SELECT_PEOPLE,
		payload: num
	})
}

export const verifyLanding = (verify) => {
	return({
		type: VERIFY_LANDING,
		payload: verify
	})
}

export const selectRestaurant = (restaurant) => {
	return({
		type: SELECT_RESTAURANT,
		payload: restaurant
	})
}

export const verifyRestaurant = (verify) => {
	return({
		type: VERIFY_RESTAURANT,
		payload: verify
	})
}

export const dishCollectionUpdate = (eventKey, id) => {
	return({
		type: DISH_COLLECTION_UPDATE,
		payload: {
			eventKey,
			id
		}
	})
}

export const dishCollectionReset = () => {
	return({
		type: DISH_COLLECTION_RESET,
		payload: []
	})
}

export const addDish = (dish) => {
	return({
		type: ADD_DISH,
		payload: dish
	})
}

export const verifyDishes = (verify) => {
	return({
		type: VERIFY_DISHES,
		payload: verify
	});
}

export const sendPageIndex = (index) => {
	return({
		type: PAGE_INDEX,
		payload: index
	})
}

export const sendError = (err) => {
	return({
		type: ERROR,
		payload: err
	});
}

export const sendErrorServing = (err) => {
	return({
		type: ERROR_SERVING,
		payload: err
	});
}