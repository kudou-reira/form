import { 
	SELECT_MEALTIME,
	SELECT_PEOPLE,
	SELECT_RESTAURANT,
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