import React,{ PropsType,Component } from 'react';
import './Todo.css';
export default class Todo extends Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
	}
	toggle() {
		this.props.toggleTodo(this.props.item.id);
	} 
	render () {
		return <li  onClick={this.toggle}
		            style={{textDecoration:this.props.item.completed ? 'line-through' : 'none',
		                    cursor:this.props.item.completed ? 'default' : 'pointer'}} 
		            className="todoitem">
		            `{this.props.index}.{this.props.item.text}`
		       </li>
	}
}