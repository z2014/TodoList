import React,{ Component,PropsType } from 'react';
import Todo from './Todo.js';
export default class TodoList extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const data = this.props.data;
		const style = {margin:0,padding:0,height:'150px',overflow:'auto'};
		return (
			<ul style={style}>
    	        {
    	        	data.map((todo,index) => {
                        return <Todo toggleTodo={this.props.toggleTodo} item={todo} key={todo.id} 
                        index={data.length-index}/>
    	            })
    	        }
    	    </ul>
		)
	}
}