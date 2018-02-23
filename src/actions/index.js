import { 
	SELECT_MEALTIME,
	SELECT_PEOPLE,
	PAGE_INDEX 
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