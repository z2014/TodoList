import React,{ Component,PropsType } from 'react';
import './AddTodo.css';
export default class AddTodo extends Component {
	constructor(props) {
		super(props);
		this.click = this.click.bind(this);
	}
	click(){
		let input = this.refs.input;
		let value = input.value;
		if (value == '') { value = '这是默认的任务'}
	    this.props.AddTodo(value);
	    input.value = '';
	}
	render() {
		return (
            <div>
                <input type="text" ref="input" className="input"/>
                <span onClick={this.click} className="add">add</span>
            </div>
		)
	}
} 