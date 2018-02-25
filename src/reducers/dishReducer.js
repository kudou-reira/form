import {
  SELECT_DISH,
  SELECT_SERVINGS,
  DISH_NUMBER,
  DISH_COLLECTION_UPDATE,
  SAVED_DISHES
} from '../actions/types';

const INITIAL_STATE = {
	dish: "----",
	savedDishes: [],
	numberOfDishes: 1,
	servings: 1,
	dishCollection: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  	case SELECT_DISH:
  		return {...state, dish: action.payload}
  	case DISH_NUMBER:
  		return {...state, numberOfDishes: action.payload}
  	case SELECT_SERVINGS:
  		return {...state, servings: action.payload}
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
  	case SAVED_DISHES:
  		return {...state, savedDishes: [...state.savedDishes, action.payload]}
    default:
      return state;
  }
}
