import AddTodo from './AddTodo.js';
import ShowList from './ShowList.js';
import TodoList from './TodoList.js';
import React,{ Component,PropsType } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { addTodo,toggleTodo,filterList } from '../action/index.js';
class App extends Component {
	constructor(props) {
		super(props);
		this.addTodo = this.addTodo.bind(this);
		this.toggleTodo = this.toggleTodo.bind(this);
		this.filter = this.filter.bind(this);
	}
	addTodo(text) {
		// fetch('')
		this.props.addTodo(text);
	}
	toggleTodo(id) {
		this.props.toggleTodo(id);
	}
	filter(name) {
		this.props.filterList(name);
	}
    render() { 
    	const data = this.props.list;
    	return (
            <div className="center">
                <p className="headline">TODOLIST</p>
	    	    <AddTodo AddTodo={this.addTodo}/>
	    	    <ShowList filter={this.filter}/>
	    	    <TodoList data={data} toggleTodo={this.toggleTodo}/>
	    	</div>
    	)
    }
}
function setVisible(todo,filter) {
	switch(filter) {
    	case 'show-todo':
    	    return todo.filter(item => !item.completed);
    	case 'show-done':
    	    return todo.filter(item => item.completed);
    	case 'show-all':
    	    return todo;
    }
}
function mapStateToProps(state) {
	return {
		list:setVisible(state.todo,state.filter)
	}
}
function mapDispatchToProps(dispatch) {
    return {
    	addTodo: (text) => dispatch(addTodo(text)),
    	toggleTodo: (id) => dispatch(toggleTodo(id)),
    	filterList: (name) => dispatch(filterList(name))
    }
}
export default connect (
    mapStateToProps,
    mapDispatchToProps
) (App);