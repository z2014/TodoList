import { filterList } from '../action/index.js';
export default function filter(state='show-all',action) {
    switch(action.type) {
    	case 'setFilter':
            return action.filter;
        default:
            return state;
    }
}