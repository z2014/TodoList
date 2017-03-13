import { combineReducers } from 'redux';
import todo from './todo';
import filter from './filter';
import user from './user';
import otherUser from './otherUser';
const rootReducer = combineReducers({
	todo,
	filter,
	user,
	otherUser
});
export default rootReducer;