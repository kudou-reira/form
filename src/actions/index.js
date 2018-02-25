import { 
	SELECT_MEALTIME,
	SELECT_PEOPLE,
	SELECT_RESTAURANT,
	SELECT_DISH,
	SELECT_SERVINGS,
	DISH_COLLECTION_UPDATE,
	DISH_NUMBER,
	SAVED_DISHES,
	VERIFY_LANDING,
	VERIFY_RESTAURANT,
	PAGE_INDEX ,
	ERROR
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

export const selectDish = (dish) => {
	return({
		type: SELECT_DISH,
		payload: dish
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

export const selectServings = (servings) => {
	return({
		type: SELECT_SERVINGS,
		payload: servings
	});
}

export const saveDish = (dish) => {
	return({
		type: SAVED_DISHES,
		payload: dish
	})
}

export const addDish = (num) => {
	return({
		type: DISH_NUMBER,
		payload: num
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