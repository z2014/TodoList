export default function user (state=[],action) {
	switch(action.type) {
		case 'userAdd' :
		    var cur = {following:++state.following};
		    return {...state,...cur};
		case 'userReduce':
		    var cur = {following:--state.following};
		    return {...state,...cur};
		default:
		    return state;
	}
} 