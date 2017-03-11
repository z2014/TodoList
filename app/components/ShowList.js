import React,{ PropsType,Component } from 'react';
import './ShowList.css';
export default class ShowList extends Component {
	constructor(props) {
		super(props);
		this.showAll = this.showAll.bind(this);
		this.showDone = this.showDone.bind(this);
		this.showTodo = this.showTodo.bind(this);
	}
	showAll() {
		this.props.filter('show-all');
	}
	showDone() {
		this.props.filter('show-done');
	}
	showTodo() {
		this.props.filter('show-todo');
	}
	render() {
		return (
			<div className="show_wrapper">
    	        <span onClick={this.showAll} className="show_item">全部项目</span>
    	        <span onClick={this.showDone} className="show_item">已完成项目</span>
    	        <span onClick={this.showTodo} className="show_item">未完成项目</span>
    	    </div>
		)
	}
}