import AddTodo from './AddTodo.js';
import ShowList from './ShowList.js';
import TodoList from './TodoList.js';
import Avatar from './Avatar.js';
import ChatPanel from './ChatPanel.js';
import RecommendBlock from './RecommendBlock';
import React,{ Component,PropsType } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { addTodo,toggleTodo,filterList,follow } from '../action/index.js';
class App extends Component {
	constructor(props) {
		super(props);
		this.addTodo = this.addTodo.bind(this);
		this.toggleTodo = this.toggleTodo.bind(this);
		this.filter = this.filter.bind(this);
		this.follow = this.follow.bind(this);
		this.exit = this.exit.bind(this);
	}
	addTodo(text) {
		this.props.addTodo(text);
	}
	toggleTodo(id) {
		this.props.toggleTodo(id);
	}
	filter(name) {
		this.props.filterList(name);
	}
	follow(name,isFollowing) {
        this.props.follow(name,isFollowing);
	}
	exit() {
		document.cookie = 'todo-online= ';
		window.location.href = '/index';
	}
    render() { 
    	const data = this.props.list;
    	const data1 = this.props.otherUser;
    	const user = this.props.user;
    	return (
    		<div className="center">
	            <div className='left'>
	                <div className='child'>
	                    <RecommendBlock data={data1} follow={this.follow}/>
	                </div>
	                <div className='child'>
	                    <Avatar data={user}/>
		                <p className="headline">TODOLIST</p>
			    	    <AddTodo AddTodo={this.addTodo}/>
			    	    <ShowList filter={this.filter}/>
			    	    <TodoList data={data} toggleTodo={this.toggleTodo}/>
			    	    <p onClick={this.exit} className="exit">注销用户</p>
			    	    <a href="https://github.com/z2014/TodoList" target="blank" className="href">喜欢就点个star吧</a>
			    	</div>
		    	</div>
		    	<ChatPanel/>
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
		list:setVisible(state.todo,state.filter),
		user:state.user,
		otherUser:state.otherUser
	}
}
function mapDispatchToProps(dispatch) {
    return {
    	addTodo: (text) => dispatch(addTodo(text)),
    	toggleTodo: (id) => dispatch(toggleTodo(id)),
    	filterList: (name) => dispatch(filterList(name)),
    	follow: (name,isFollowing) => dispatch(follow(name,isFollowing))
    }
}
export default connect (
    mapStateToProps,
    mapDispatchToProps
) (App);