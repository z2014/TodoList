export default function todo(state = [],action) {
	switch(action.type) {
		case 'addTodo':
		    return [
		        action.data,
		        ...state
		    ]
		case 'toggleTodo':
		    return state.map(function(item,index) {
		    	if (action.id == item.id) {
		    		return {
		    			id:action.id,
		    			text:item.text,
		    			completed:true
		    		}
		    	}else {
		    	    return item;
		    	}
		    });
		default:
		    return state;
	}
}