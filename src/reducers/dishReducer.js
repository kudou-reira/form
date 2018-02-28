import {
  DISH_COLLECTION_UPDATE,
  ADD_DISH,
  DELETE_DISH,
  RECORD_DISHES,
  DISH_COLLECTION_RESET,
  VERIFY_DISHES
} from '../actions/types';

const INITIAL_STATE = {
	dishCollection: [],
	verifyDishes: false,
	recordDishes: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  	case ADD_DISH:
  		return {...state, dishCollection: [...state.dishCollection, action.payload]};
  	case DELETE_DISH:
  		let index = state.dishCollection.findIndex((dish) => dish.id === action.payload); 
  		return {...state, dishCollection: [...state.dishCollection.slice(0, index), ...state.dishCollection.slice(index+1)]};
  	case RECORD_DISHES:
  		return {...state, recordDishes: action.payload}
  	case VERIFY_DISHES:
      return {...state, verifyDishes: action.payload}
  	case DISH_COLLECTION_RESET:
  		return {...state, dishCollection: []}
  	case DISH_COLLECTION_UPDATE:
  		var eventKey = action.payload.eventKey;
  		var type = typeof(eventKey);
  		var id = action.payload.id;
  		const existsAt = state.dishCollection.findIndex(dish => dish.id === id);
  		if(existsAt === -1) {
  			if(type === "string") {
  				var tempObject = {
  					id: id,
  					dish: eventKey,
  					servings: 1
  				}
  				return {...state, dishCollection: [...state.dishCollection, tempObject]};
  			}
  		} else {
  			console.log("this is existsAt", existsAt);
  			// exists in the array
  			// process update
  			// !! IMPORTANT !!
  			// check if the eventKey is a string and if it's equal to the current one or not
  			if(type === "string") {
  				console.log("this is type", type);
					return {
		        ...state,
		        dishCollection: state.dishCollection.map(dish => dish.id === id ?
	            // transform the one with a matching id
	            { ...dish, dish: eventKey } : 
	            // otherwise return original dish
	            dish
		        ) 
			    };
  			} else if(type === "number") {
  				console.log("this is type", type);
					return {
		        ...state,
		        dishCollection: state.dishCollection.map(dish => dish.id === id ?
	            // transform the one with a matching id
	            { ...dish, servings: eventKey } : 
	            // otherwise return original dish
	            dish
		        ) 
			    };
  			}
  		}
    default:
      return state;
  }
}
