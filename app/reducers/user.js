export default function user (state=[],action) {
	switch(action.type) {
		case 'userAddFollowing' :
		    var cur = {following:++state.following};
		    return {...state,...cur};
		case 'userReduceFollowing':
		    var cur = {following:--state.following};
		    return {...state,...cur};
		default:
		    return state;
	}
} 