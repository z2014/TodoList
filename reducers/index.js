import { combineReducers } from 'redux';
import todo from './todo';
import filter from './filter';
const rootReducer = combineReducers({
	todo,
	filter
});
export default rootReducer;