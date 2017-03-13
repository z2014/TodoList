export default function otherUser(state=[],action) {
    switch(action.type) {
    	case 'add':
    	    return state.map(function(item) {
    	    	if (item.id === action.id) {
    	    		return {
    	    			name:item.name,
                        id:item.id,
    	    			follow:1
    	    		};
    	    	} else {
    	    		return item;
    	    	}
    	    })
    	case 'reduce':
    	    return state.map(function(item) {
    	    	if (item.id === action.id) {
    	    		return {
    	    			name:item.name,
                        id:item.id,
    	    			follow:0
    	    		}
    	    	} else {
    	    		return item;
    	    	}
    	    })
    	default :
    	    return state;
    }
}